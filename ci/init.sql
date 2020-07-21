#
CREATE DATABASE
IF NOT EXISTS Proposals_MRS;
USE Proposals_MRS;

# create the users
CREATE USER
IF NOT EXISTS 'dbuser'@'%' IDENTIFIED BY 'dbuser#1812';
GRANT CREATE, ALTER, INDEX, LOCK TABLES, REFERENCES, UPDATE, DELETE, DROP, SELECT, INSERT ON Proposals_MRS.* TO 'dbuser'@'%';

FLUSH PRIVILEGES;

CREATE TABLE
IF NOT EXISTS reviewers
(
    `id` int NOT NULL AUTO_INCREMENT,
    ldap_username char
(50) CHARACTER
SET utf8mb4
COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' UNIQUE,
    first_name char
(50) CHARACTER
SET utf8mb4
COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
    last_name char
(50) CHARACTER
SET utf8mb4
COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
    email char
(50) CHARACTER
SET utf8mb4
COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    phone_number bigint
(50) DEFAULT NULL,
    created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NULL DEFAULT NULL ON
UPDATE CURRENT_TIMESTAMP,
    user_status char(20) CHARACTER
SET utf8mb4
COLLATE utf8mb4_unicode_ci DEFAULT 'regular',
    PRIMARY KEY
(`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 32 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE
IF NOT EXISTS proposals
(
    `id` int NOT NULL AUTO_INCREMENT,
    title varchar
(250) CHARACTER
SET utf8mb4
COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
    VA_sponsor char
(100) DEFAULT NULL,
    support char
(100) CHARACTER
SET utf8mb4
COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    project_presenter char
(50) DEFAULT NULL,
    created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NULL DEFAULT NULL ON
UPDATE CURRENT_TIMESTAMP,
    stage int(11)
DEFAULT NULL,
    status varchar
(50) CHARACTER
SET utf8mb4
COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    deleted char
(50) CHARACTER
SET utf8mb4
COLLATE utf8mb4_unicode_ci DEFAULT 'false',
    cycle int
(11) DEFAULT NULL,
    PRIMARY KEY
(`id`),
    UNIQUE KEY
(`id`)
) ENGINE = InnoDB;

# AUTO_INCREMENT = 2019046 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci

CREATE TABLE
IF NOT EXISTS reviewdata
(
    `id` int NOT NULL AUTO_INCREMENT,
    proposal_id int NOT NULL,
    reviewer_id int NOT NULL,
    business_score int DEFAULT NULL,
    business_comms longtext CHARACTER
SET utf8mb4
COLLATE utf8mb4_unicode_ci,
    feasibility_score int DEFAULT NULL,
    feasibility_comms longtext CHARACTER
SET utf8mb4
COLLATE utf8mb4_unicode_ci,
    resources_score int DEFAULT NULL,
    resources_comms longtext CHARACTER
SET utf8mb4
COLLATE utf8mb4_unicode_ci,
    commitment_score int DEFAULT NULL,
    commitment_comms longtext CHARACTER
SET utf8mb4
COLLATE utf8mb4_unicode_ci,
    constraints_score int DEFAULT NULL,
    constraints_comms longtext CHARACTER
SET utf8mb4
COLLATE utf8mb4_unicode_ci,
    overall_comms longtext CHARACTER
SET utf8mb4
COLLATE utf8mb4_unicode_ci,
    created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NULL DEFAULT NULL ON
UPDATE CURRENT_TIMESTAMP,
    submitted char(25) CHARACTER
SET utf8mb4
COLLATE utf8mb4_unicode_ci DEFAULT 'false',
    PRIMARY KEY
(`id`),
    CONSTRAINT FK_reviewdata_proposals FOREIGN KEY
(proposal_id)
      REFERENCES proposals
(`id`)
      ON
DELETE CASCADE
      ON
UPDATE CASCADE,

    CONSTRAINT FK_reviewdata_reviewers FOREIGN KEY
(reviewer_id)
      REFERENCES reviewers
(`id`)
      ON
DELETE CASCADE
      ON
UPDATE CASCADE

) ENGINE = InnoDB;

INSERT IGNORE INTO reviewers (ldap_username, first_name, last_name) VALUES
('vhabhsgieraa', 'Aaron', 'Giera'),
('vhabhsliangk', 'Kuei-Cheng', 'Liang'),
('vhabhshewitm', 'Mark', 'Hewitt'),
('vhabhshsiehp', 'Paul', 'Hsieh');

