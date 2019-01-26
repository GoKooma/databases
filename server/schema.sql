
DROP DATABASE chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  `username` VARCHAR(255) ,
  PRIMARY KEY (`username`)
);

CREATE TABLE `messages` (
  `id` INTEGER AUTO_INCREMENT,
  `message` VARCHAR(255) ,
  `username` VARCHAR(255) ,
  `roomname` VARCHAR(255) ,
  PRIMARY KEY (`id`)
);

CREATE TABLE `chatroom` (
  `roomname` VARCHAR(255),
  PRIMARY KEY (`roomname`)
);

ALTER TABLE `messages` ADD FOREIGN KEY (username) REFERENCES `users` (`username`);
ALTER TABLE `messages` ADD FOREIGN KEY (roomname) REFERENCES `chatroom` (`roomname`);
/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'users'
-- 
-- ---

-- DROP TABLE IF EXISTS `users`;
		


-- ---
-- Table 'messages'
-- 
-- ---

-- DROP TABLE IF EXISTS `messages`;
		


-- ---
-- Table 'chatroom'
-- 
-- ---

-- DROP TABLE IF EXISTS `chatroom`;
		


-- ---
-- Foreign Keys 
-- ---



-- ---
-- Table Properties
-- ---

-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `chatroom` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `users` (`username`) VALUES
-- ('');
-- INSERT INTO `messages` (`id`,`content`,`username`,`roomname`) VALUES
-- ('','','','');
-- INSERT INTO `chatroom` (`roomname`) VALUES
-- ('');