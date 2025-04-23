import usersController from './usersController.js';

async function getAll(req, res) {
    try {
        const users = await usersController.getAll();
        res.render("user/list", { users });

    } catch (error) {
        console.error(error);
        res.render("layout", { error: "Internal Server Error" });
    }
}

async function getByID(req, res) {
    try {
        const id = req.params.id;
        const user = await usersController.getByID(id);

        if (!user) {
            return res.render("layout", { error: "There is no user for that ID" });
        }

        res.render("user/show", { user });

    } catch (error) {
        console.error(error);
        res.render("layout", { error: "Internal Server Error" });
    }
}

async function editForm(req, res) {
    try {
        const id = req.params.id;
        const user = await usersController.getByID(id);

        if (!user) {
            return res.redirect("/user");
        }

        res.render("user/edit", { user });

    } catch (error) {
        console.error(error);
        res.render("layout", { error: "Internal Server Error" });
    }
}

async function edit(req, res) {
    const id = req.params.id;

    try {
        const result = await usersController.edit(id, req.body);
        res.redirect("/user/" + id);

    } catch (error) {
        if (error.statusCode) {
            res.redirect(`/user/${id}/edit?error=` + error.message);
        } else {
            res.render("layout", { error: "Internal Server Error" });
        }
    }
}

export default {
    getAll,
    getByID,
    edit,
    editForm
};
