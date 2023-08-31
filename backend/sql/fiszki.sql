CREATE TABLE `language` (
  `languageID` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `languagename` varchar(32) NOT NULL,
  `languagepicture` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `user` (
  `userID` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `password` char(255) NOT NULL,
  `profilepic` varchar(255) NOT NULL,
  `email` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `usertoken` (
  `usertokenID` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `token` char(32) NOT NULL,
  FOREIGN KEY (userID) REFERENCES user(userID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `fcgroups` (
  `fcgroupsID` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `groupname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `flashcards` (
  `flashcardsID` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `languageID` int(11) NOT NULL,
  `languageforeignID` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `userID` int(11) NOT NULL,
  FOREIGN KEY (userID) REFERENCES user(userID),
  FOREIGN KEY (languageID) REFERENCES language(languageID),
  FOREIGN KEY (languageforeignID) REFERENCES language(languageID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `fctype` (
  `fctypeID` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `flashcardsID` int(11) NOT NULL,
  `fcgroupsID` int(11) NOT NULL,
  FOREIGN KEY (flashcardsID) REFERENCES flashcards(flashcardsID),
  FOREIGN KEY (fcgroupsID) REFERENCES fcgroups(fcgroupsID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `fcdata` (
  `fcdataID` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `flashcardsID` int(11) NOT NULL,
  `word1` varchar(255) NOT NULL,
  `word2` varchar(255) NOT NULL,
  FOREIGN KEY (flashcardsID) REFERENCES flashcards(flashcardsID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `fcgroups` (`fcgroupsID`, `groupname`) VALUES
(0, 'clothes'),
(1, 'food'),
(2, 'sports'),
(3, 'traffic'),
(4, 'jobs'),
(5, 'swear words'),
(6, 'city');

INSERT INTO `language` (`languageID`, `languagename`, `languagepicture`) VALUES
(0, 'Polish', 'pl_flag.jpg'),
(1, 'Italian', 'it_flag.jpg'),
(2, 'French', 'fr_flag.jpg'),
(3, 'German', 'ge_flag.jpg');
