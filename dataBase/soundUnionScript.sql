-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema liteLearn
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `liteLearn` ;

-- -----------------------------------------------------
-- Schema liteLearn
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `liteLearn` ;
USE `liteLearn` ;

-- -----------------------------------------------------
-- Table `liteLearn`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `liteLearn`.`users` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(85) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `liteLearn`.`songs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `liteLearn`.`songs` (
  `song_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `category` VARCHAR(45) NOT NULL,
  `artist` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`song_id`),
  UNIQUE INDEX `course_id_UNIQUE` (`song_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `liteLearn`.`playlists`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `liteLearn`.`playlists` (
  `playlist_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `isPublic` TINYINT(1) NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`playlist_id`),
  UNIQUE INDEX `enrollment_id_UNIQUE` (`playlist_id` ASC) VISIBLE,
  INDEX `fk_playlists_users_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_playlists_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `liteLearn`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `liteLearn`.`songs_playlists`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `liteLearn`.`songs_playlists` (
  `song_id` INT UNSIGNED NOT NULL,
  `playlist_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`song_id`, `playlist_id`),
  INDEX `fk_songs_has_playlists_playlists1_idx` (`playlist_id` ASC) VISIBLE,
  INDEX `fk_songs_has_playlists_songs1_idx` (`song_id` ASC) VISIBLE,
  CONSTRAINT `fk_songs_has_playlists_songs1`
    FOREIGN KEY (`song_id`)
    REFERENCES `liteLearn`.`songs` (`song_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_songs_has_playlists_playlists1`
    FOREIGN KEY (`playlist_id`)
    REFERENCES `liteLearn`.`playlists` (`playlist_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
