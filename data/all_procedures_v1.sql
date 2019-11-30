-- screen 1:user login
DROP PROCEDURE IF EXISTS user_login;
DELIMITER $$
CREATE PROCEDURE `user_login`(IN i_username VARCHAR(50), IN i_password VARCHAR(50))
BEGIN
    DROP TABLE IF EXISTS UserLogin;
    CREATE TABLE UserLogin
	SELECT username, status, 
		CASE 
			WHEN username in (select username from customer) then 1
			ELSE 0
		END AS isCustomer,
		CASE 
			WHEN username in (select username from admin) then 1
			ELSE 0
		END AS isAdmin,
		CASE 
			WHEN username in (select username from manager) then 1
			ELSE 0
		END AS isManager
    FROM user
    WHERE 
		username = i_username AND
        password = md5(i_password);
END$$
DELIMITER ;

-- screen 3: user register
DROP PROCEDURE IF EXISTS user_register;
DELIMITER $$
CREATE PROCEDURE `user_register`(IN i_username VARCHAR(50), IN i_password VARCHAR(50), IN i_firstname VARCHAR(50), IN i_lastname VARCHAR(50))
BEGIN
		INSERT INTO user (username, password, firstname, lastname) VALUES (i_username, MD5(i_password), i_firstname, i_lastname);
END$$
DELIMITER ;

-- screen 4: customer-only register
DROP PROCEDURE IF EXISTS customer_only_register;
DELIMITER $$
CREATE PROCEDURE `customer_only_register`(IN i_username VARCHAR(50), IN i_password VARCHAR(50), IN i_firstname VARCHAR(50), IN i_lastname VARCHAR(50))
BEGIN
		INSERT INTO user (username, password, firstname, lastname) VALUES (i_username, MD5(i_password), i_firstname, i_lastname);
		INSERT INTO customer (username) VALUES (i_username);
END$$
DELIMITER ;

-- screen 4: customer add credit card
-- Note: This should ensure improper credit cards and status changes are refused (here only the length is handled)
DROP PROCEDURE IF EXISTS customer_add_creditcard;
DELIMITER $$
CREATE PROCEDURE `customer_add_creditcard`(IN i_username VARCHAR(50), IN i_creditCardNum CHAR(16))
BEGIN
	DECLARE creditCardCount INT;
	SET creditCardCount = (SELECT COUNT(*) 
	FROM creditcard
	WHERE Username = i_username);
	IF (CHAR_LENGTH(i_creditCardNum) = 16) AND (creditCardCount < 5) THEN
		INSERT INTO creditcard (username, creditcardnumber) VALUES (i_username, i_creditCardNum);
	ELSE 
		SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'Credit card count exceeds.';
	END IF;
END$$
DELIMITER ;

-- screen 5: manager-only register
-- Logical constraint: address is unique among all managers
DROP PROCEDURE IF EXISTS manager_only_register;
DELIMITER $$
CREATE PROCEDURE `manager_only_register`(IN i_username VARCHAR(50), IN i_password VARCHAR(50), IN i_firstname VARCHAR(50), IN i_lastname VARCHAR(50), IN i_comName VARCHAR(50), IN i_empStreet VARCHAR(50), IN i_empCity VARCHAR(50), IN i_empState CHAR(2), IN i_empZipcode CHAR(5))
BEGIN
	DECLARE address_count INTEGER;
	SET address_count = (SELECT COUNT(*) FROM manager
	WHERE Street = i_empStreet AND City = i_empCity AND State = i_empState AND Zipcode = i_empZipcode);
	IF address_count = 0 THEN
		INSERT INTO user (username, password, firstname, lastname) VALUES (i_username, MD5(i_password), i_firstname, i_lastname);
		INSERT INTO employee (username) VALUES (i_username);
        INSERT INTO manager (username, street, city, state, zipcode, company) VALUES (i_username, i_empStreet, i_empCity, i_empState, i_empZipcode, i_comName);
	ELSE 
		SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'Manager address is not unique';
    END IF;
END$$
DELIMITER ;

-- screen 6: manager-customer register
-- Logical constraint: address is unique among all managers
DROP PROCEDURE IF EXISTS manager_customer_register;
DELIMITER $$
CREATE PROCEDURE `manager_customer_register`(IN i_username VARCHAR(50), IN i_password VARCHAR(50), IN i_firstname VARCHAR(50), IN i_lastname VARCHAR(50), IN i_comName VARCHAR(50), IN i_empStreet VARCHAR(50), IN i_empCity VARCHAR(50), IN i_empState CHAR(2), IN i_empZipcode CHAR(5))
BEGIN
	DECLARE address_count INTEGER;
	SET address_count = (SELECT COUNT(*) FROM manager
	WHERE Street = i_empStreet AND City = i_empCity AND State = i_empState AND Zipcode = i_empZipcode);
	IF address_count = 0 THEN
		INSERT INTO user (username, password, firstname, lastname) VALUES (i_username, MD5(i_password), i_firstname, i_lastname);
		INSERT INTO employee (username) VALUES (i_username);
        INSERT INTO manager (username, street, city, state, zipcode, company) VALUES (i_username, i_empStreet, i_empCity, i_empState, i_empZipcode, i_comName);
		INSERT INTO customer (username) VALUES (i_username);
	ELSE 
		SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'Manager address is not unique';
	END IF;
END$$
DELIMITER ;

-- screen 6: manager-customer add credit card
-- Note: This should ensure improper credit cards and status changes are refused (here only the length is handled)
DROP PROCEDURE IF EXISTS manager_customer_add_creditcard;
DELIMITER $$
CREATE PROCEDURE `manager_customer_add_creditcard`(IN i_username VARCHAR(50), IN i_creditCardNum CHAR(16))
BEGIN
	DECLARE creditCardCount INT;
	SET creditCardCount = (SELECT COUNT(*) 
	FROM creditcard
	WHERE Username = i_username);
	IF (CHAR_LENGTH(i_creditCardNum) = 16) AND (creditCardCount < 5) THEN
		INSERT INTO creditcard (username, creditcardnumber) VALUES (i_username, i_creditCardNum);
	ELSE 
		SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'Credit card number exceeds';
	END IF;
END$$
DELIMITER ;

-- screen 13: admin approve user
DROP PROCEDURE IF EXISTS admin_approve_user;
DELIMITER $$
CREATE PROCEDURE `admin_approve_user`(IN i_username VARCHAR(50))
BEGIN
		UPDATE user
        SET status = 'approved'
        WHERE (status = 'pending' OR status = 'declined') AND username = i_username;
END$$
DELIMITER ;

-- screen 13: admin decline user
DROP PROCEDURE IF EXISTS admin_decline_user;
DELIMITER $$
CREATE PROCEDURE `admin_decline_user`(IN i_username VARCHAR(50))
BEGIN
		UPDATE user
        SET status = 'declined'
        WHERE status = 'pending' AND username = i_username;
END$$
DELIMITER ;


-- screen 13: admin filter user
DROP PROCEDURE IF EXISTS admin_filter_user;
DELIMITER $$
CREATE PROCEDURE `admin_filter_user`(IN i_username VARCHAR(50), IN i_status ENUM('Approved', 'Pending', 'Declined', 'ALL'), IN i_sortBy ENUM('username', 'creditCardCount', 'userType', 'status', ''), IN i_sortDirection ENUM('DESC', 'ASC', ''))
BEGIN
	DROP TABLE IF EXISTS AdFilterUser;
    CREATE TABLE AdFilterUser
	SELECT username, creditCardCount, userType, status
	FROM
	(SELECT user.Username as username, creditCardCount,
		CASE 
			WHEN user.Username IN (SELECT Username FROM customer) AND user.Username IN (SELECT Username FROM manager) THEN 'CustomerManager'
			WHEN user.Username IN (SELECT Username FROM customer) AND user.Username IN (SELECT Username FROM admin) THEN 'CustomerAdmin'
			WHEN user.Username IN (SELECT Username FROM manager) THEN 'Manager'
			WHEN user.Username IN (SELECT Username FROM admin) THEN 'Admin'
			WHEN user.Username IN (SELECT Username FROM customer) THEN 'Customer'
			ELSE 'User'
		END AS userType,
		user.Status as status
	FROM user
	JOIN
	(SELECT user.Username, COUNT(creditcard.CreditCardNumber) AS creditCardCount
	FROM user
	LEFT OUTER JOIN creditcard
	ON user.Username = creditcard.Username
	GROUP BY user.Username) AS A
	ON user.Username = A.UserName
	WHERE (i_username = '' OR user.Username = i_username)
	AND (i_status = 'ALL' or user.Status = i_status)) AS B
	ORDER BY 
		(CASE WHEN (i_sortBy = '' OR i_sortBy = 'username') AND i_sortDirection = 'ASC' THEN username END) ASC,
		(CASE WHEN i_sortBy = 'creditCardCount' AND i_sortDirection = 'ASC' THEN creditCardCount END) ASC,
		(CASE WHEN i_sortBy = 'userType' AND i_sortDirection = 'ASC' THEN userType END) ASC,
		(CASE WHEN i_sortBy = 'status' AND i_sortDirection = 'ASC' THEN status END) ASC,
		(CASE WHEN ((i_sortBy = '' OR i_sortBy = 'username')AND (i_sortDirection = '' OR i_sortDirection = 'DESC')) THEN username END) DESC,
		(CASE WHEN (i_sortBy = 'creditCardCount' AND (i_sortDirection = '' OR i_sortDirection = 'DESC')) THEN creditCardCount END) DESC,
		(CASE WHEN (i_sortBy = 'userType' AND (i_sortDirection = '' OR i_sortDirection = 'DESC')) THEN userType END) DESC,
		(CASE WHEN (i_sortBy = 'status' AND (i_sortDirection = '' OR i_sortDirection = 'DESC')) THEN status END) DESC;
END $$
DELIMITER ;



-- screen 14: admin filter company
DROP PROCEDURE IF EXISTS admin_filter_company;
DELIMITER $$
CREATE PROCEDURE `admin_filter_company`(IN i_comName VARCHAR(50), IN i_minCity INT, IN i_maxCity INT, IN i_minTheater INT, IN i_maxTheater INT, i_minEmployee INT, IN i_maxEmployee INT, IN i_sortBy ENUM('comName', 'numCityCover', 'numTheater', 'numEmployee', ''), IN i_sortDirection ENUM('ASC', 'DESC', ''))
BEGIN
	DROP TABLE IF EXISTS AdFilterCom;
    CREATE TABLE AdFilterCom
	SELECT A.comName, numCityCover, numTheater, numEmployee
	FROM
		(SELECT C.comName, COUNT(DISTINCT City, State) AS numCityCover, COUNT(theater.Name) AS numTheater
		FROM 
			(SELECT company.Name AS comName
			FROM company
			WHERE i_comName = 'ALL' OR company.Name = i_comName) AS C
		LEFT OUTER JOIN theater
		ON C.comName = theater.Company
		GROUP BY C.comName
		HAVING 
		(i_minCity IS NULL OR COUNT(DISTINCT City, State) >=i_minCity) AND
		(i_maxCity IS NULL OR  COUNT(DISTINCT City, State) <= i_maxCity ) AND
		(i_minTheater IS NULL OR COUNT(theater.Name) >= i_minTheater) AND
		(i_maxTheater IS NULL OR COUNT(theater.Name) <= i_maxTheater )) AS A
	JOIN
		(SELECT company.Name AS comName, COUNT(manager.Username) AS numEmployee
		FROM company
		LEFT OUTER JOIN manager
		ON (i_comName = 'ALL' OR company.Name = i_comName) AND company.Name = manager.Company
		GROUP BY company.Name
		HAVING
		(i_minEmployee IS NULL OR COUNT(manager.Username) >= i_minEmployee ) AND
		(i_maxEmployee IS NULL OR COUNT(manager.Username) <= i_maxEmployee)) AS B
	ON A.comName = B.comName
	ORDER BY 
		(CASE WHEN ((i_sortBy = '' OR i_sortBy = 'comName') AND i_sortDirection = 'ASC') THEN A.comName END) ASC,
		(CASE WHEN i_sortBy = 'numCityCover' AND i_sortDirection = 'ASC' THEN numCityCover END) ASC,
		(CASE WHEN i_sortBy = 'numTheater' AND i_sortDirection = 'ASC' THEN numTheater END) ASC,
		(CASE WHEN i_sortBy = 'numEmployee' AND i_sortDirection = 'ASC' THEN numEmployee END) ASC,
		(CASE WHEN ((i_sortBy = '' OR i_sortBy = 'comName') AND (i_sortDirection = '' OR i_sortDirection = 'DESC')) THEN A.comName END) DESC,
		(CASE WHEN (i_sortBy = 'numCityCover' AND (i_sortDirection = '' OR i_sortDirection = 'DESC')) THEN numCityCover END) DESC,
		(CASE WHEN (i_sortBy = 'numTheater' AND (i_sortDirection = '' OR i_sortDirection = 'DESC')) THEN numTheater END) DESC,
		(CASE WHEN (i_sortBy = 'numEmployee' AND (i_sortDirection = '' OR i_sortDirection = 'DESC')) THEN numEmployee END) DESC;
END$$
DELIMITER ;



-- screen 15: admin create theater
-- Note: This should ensure improper theater is not created (manager must belong to appropriate company)
DROP PROCEDURE IF EXISTS admin_create_theater;
DELIMITER $$
CREATE PROCEDURE `admin_create_theater`(IN i_thName VARCHAR(50), IN i_comName VARCHAR(50), IN i_thStreet VARCHAR(50), IN i_thCity VARCHAR(50), IN i_thState CHAR(2), IN i_thZipcode CHAR(5), IN i_capacity INT, IN i_managerUsername VARCHAR(50))    
BEGIN
		INSERT INTO theater (Company, Name, Capacity, Street, City, State, Zipcode, ManagerUsername)
        VALUES (i_comName, i_thName, i_capacity, i_thStreet, i_thCity, i_thState, i_thZipcode, i_managerUsername);
END$$
DELIMITER ;

-- screen 16: admin view company detail (Employee)
DROP PROCEDURE IF EXISTS admin_view_comDetail_emp;
DELIMITER $$
CREATE PROCEDURE `admin_view_comDetail_emp`(IN i_comName VARCHAR(50))
BEGIN
	DROP TABLE IF EXISTS AdComDetailEmp;
    CREATE TABLE AdComDetailEmp
		SELECT Firstname as empFirstName, Lastname as empLastname
		FROM user
        WHERE username IN (SELECT Username FROM manager WHERE Company = i_comName);
END$$
DELIMITER ;


-- screen 16: admin view company detail (Theater)
DROP PROCEDURE IF EXISTS admin_view_comDetail_th;
DELIMITER $$
CREATE PROCEDURE `admin_view_comDetail_th`(IN i_comName VARCHAR(50))
BEGIN
	DROP TABLE IF EXISTS AdComDetailTh;
	CREATE TABLE AdComDetailTh
		SELECT Name as thName, ManagerUsername as thManagerUsername, City as thCity, State as thState, Capacity as thCapacity
        FROM theater
		WHERE Company = i_comName;
END$$
DELIMITER ;


-- screen 17: admin create movie
DROP PROCEDURE IF EXISTS admin_create_mov;
DELIMITER $$
CREATE PROCEDURE `admin_create_mov`(IN i_movName VARCHAR(50), IN i_movDuration INT, IN i_movReleaseDate DATE)
BEGIN
		INSERT INTO movie (Name, ReleaseDate, Duration)
        VALUES (i_movName, i_movReleaseDate, i_movDuration);
END$$
DELIMITER ;

-- screen 18: manager filter theater
DROP PROCEDURE IF EXISTS manager_filter_th;
DELIMITER $$
CREATE PROCEDURE `manager_filter_th`(IN i_manUsername VARCHAR(50), IN i_movName VARCHAR(50), IN i_minMovDuration INT, IN i_maxMovDuration INT, IN i_minMovReleaseDate Date, IN i_maxMovReleaseDate Date, IN i_minMovPlayDate Date, IN  i_maxMovPlayDate Date, IN i_includeNotPlayed Boolean)
BEGIN
    DROP TABLE IF EXISTS ManFilterTh;
	CREATE TABLE ManFilterTh
	SELECT movName, movDuration, movReleaseDate, movPlayDate
	FROM
		(SELECT movie.Name as movName, Duration AS movDuration, movie.ReleaseDate as movReleaseDate, movPlayDate
		FROM movie
		LEFT OUTER JOIN
			(SELECT Movie AS movName, ReleaseDate AS movReleaseDate, PlayDate AS movPlayDate
			FROM
				(SELECT NAME AS Theater, Company
				FROM theater
				WHERE ManagerUserName = i_manUsername) AS A
			JOIN movieplay
			ON A.Theater = movieplay.Theater AND A.Company = movieplay.Company)
			AS B
		ON movie.Name = B.movName  AND movie.ReleaseDate = B.movReleaseDate
		WHERE (i_movName ="" OR Locate(i_movName, movie.Name) > 0) AND
		      (i_minMovReleaseDate IS NULL OR movie.ReleaseDate >= i_minMovReleaseDate) AND 
			  (i_maxMovReleaseDate IS NULL OR movie.ReleaseDate <= i_maxMovReleaseDate) AND
			  (i_minMovPlayDate IS NULL OR movPlayDate >= i_minMovPlayDate) AND 
			  (i_maxMovPlayDate IS NULL OR movPlayDate <= i_maxMovPlayDate) AND
			  (i_minMovDuration IS NULL OR Duration >= i_minMovDuration) AND
			  (i_maxMovDuration IS NULL OR Duration <= i_maxMovDuration) AND
			  ((i_includeNotPlayed IS NULL OR i_includeNotPlayed = FALSE) OR (movPlayDate is NULL))) 
	AS C
	JOIN 
		(SELECT NAME AS Theater, Company
		FROM theater
		WHERE ManagerUserName = i_manUsername)
	AS D
	ON TRUE;
END$$
DELIMITER ;



-- screen 19: manager schedule movie 
-- Note: This procedure should ensure movie was not scheduled before release date
-- Should handle the capacity of the theater since “Capacity” of a theater is the maximum number of movies it can play for the same date??
DROP PROCEDURE IF EXISTS manager_schedule_mov;
DELIMITER $$
CREATE PROCEDURE `manager_schedule_mov`(IN i_manUsername VARCHAR(50), IN i_movName VARCHAR(50), IN i_movReleaseDate Date, IN i_movPlayDate Date)
BEGIN
	IF (i_movReleaseDate <= i_movPlayDate) THEN	
		INSERT INTO MoviePlay (Movie,  ReleaseDate, PlayDate, Theater, Company) 
			SELECT i_movName, i_movReleaseDate, i_movPlayDate, Name, Company
			FROM Theater
			WHERE ManagerUserName = i_manUsername;
	ELSE 
		SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'Invalid movie play date';
	END IF;
END$$
DELIMITER ;



-- screen 20: Customer filter movie
DROP PROCEDURE IF EXISTS customer_filter_mov;
DELIMITER $$
CREATE PROCEDURE `customer_filter_mov`(IN i_movName VARCHAR(50), IN i_comName VARCHAR(50), IN i_city VARCHAR(50), IN i_state VARCHAR(3), IN i_minMovPlayDate Date, IN i_maxMovPlayDate Date)
BEGIN
    DROP TABLE IF EXISTS CosFilterMovie;
    CREATE TABLE CosFilterMovie
	SELECT MoviePlay.Movie AS movName, Theater.Name as thName, Street as thStreet, City as thCity, State as thState, Zipcode as thZipcode, Theater.Company as comName, PlayDate as movPlayDate, ReleaseDate as movReleaseDate
    FROM MoviePlay
	JOIN Theater
	ON Theater.Company = MoviePlay.Company AND Theater.Name = MoviePlay.Theater
    WHERE 
		(i_movName = 'ALL' OR Movie = i_movName) AND
		(i_comName = 'ALL' OR Theater.Company =  i_comName) AND
		(i_city = "" OR City = i_city) AND
		(i_state = "ALL" OR State = i_state) AND
		(i_minMovPlayDate IS NULL OR PlayDate >= i_minMovPlayDate) AND 
		(i_maxMovPlayDate IS NULL OR PlayDate <= i_maxMovPlayDate);
END$$
DELIMITER ;

-- screen 20: customer view movie [How to handle the logical constraint: customer can at most watch 3 movies per day]
-- Note: This should ensure customer is not able to view more than three movies per day
DROP PROCEDURE IF EXISTS customer_view_mov;
DELIMITER $$
CREATE PROCEDURE `customer_view_mov`(IN i_creditCardNum CHAR(16), IN i_movName VARCHAR(50), IN i_movReleaseDate Date, IN i_thName VARCHAR(50), IN i_comName VARCHAR(50), IN i_movPlayDate Date)
BEGIN
	DECLARE mov_view_count INT;
	DROP VIEW IF EXISTS `customer_view_mov_count`;
	CREATE VIEW `customer_view_mov_count` AS
	SELECT A.Username , customerviewmovie.ViewDate
	FROM customerviewmovie
	JOIN
		(SELECT CreditCardNumber, creditcard.Username AS Username
		FROM creditcard
		JOIN user
		on creditcard.Username = user.Username)
		AS A
	ON customerviewmovie.CreditCardNumber = A.CreditCardNumber;
	SET mov_view_count = (SELECT COUNT(*)
		FROM customer_view_mov_count
		WHERE Username in (SELECT Username FROM creditcard WHERE CreditCardNumber = i_creditCardNum) AND
			  ViewDate = i_movPlayDate);
	IF (mov_view_count < 3) THEN
		INSERT INTO customerviewmovie (Movie,  ReleaseDate, ViewDate, Theater, Company, CreditCardNumber) 
		VALUES (i_movName, i_movReleaseDate, i_movPlayDate, i_thName, i_comName, i_creditCardNum); 
	ELSE 
		SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'Not able to view more than three movies per day';
	END IF;
END$$
DELIMITER ;



-- screen 21: Customer view history
DROP PROCEDURE IF EXISTS customer_view_history;
DELIMITER $$
CREATE PROCEDURE `customer_view_history`(IN i_cusUsername VARCHAR(50))
BEGIN
    DROP TABLE IF EXISTS CosViewHistory;
    CREATE TABLE CosViewHistory
	SELECT Movie as movName, Theater as thName, Company as comName, CreditCardNumber as creditCardNum, ViewDate as movPlayDate
    FROM customerviewmovie
	WHERE CreditCardNumber IN
		(SELECT CreditCardNumber 
		FROM creditcard
		WHERE Username = i_cusUsername);
END$$
DELIMITER ;

-- screen 22: user filter theater
DROP PROCEDURE IF EXISTS user_filter_th;
DELIMITER $$
CREATE PROCEDURE `user_filter_th`(IN i_thName VARCHAR(50), IN i_comName VARCHAR(50), IN i_city VARCHAR(50), IN i_state VARCHAR(3))
BEGIN
    DROP TABLE IF EXISTS UserFilterTh;
    CREATE TABLE UserFilterTh
	SELECT Name AS thName, Street AS thStreet, City AS thCity, State AS thState, Zipcode AS thZipcode, Company AS comName 
    FROM theater
    WHERE 
		(i_thName = "ALL" OR Name = i_thName) AND
        (i_comName = "ALL" OR Company = i_comName) AND
        (i_city = "" OR City = i_city) AND
        (i_state = "ALL" OR State = i_state);
END$$
DELIMITER ;

-- screen 22: user visit theater
DROP PROCEDURE IF EXISTS user_visit_th;
DELIMITER $$
CREATE PROCEDURE `user_visit_th`(IN i_thName VARCHAR(50), IN i_comName VARCHAR(50), IN i_visitDate DATE, IN i_username VARCHAR(50))
BEGIN
    INSERT INTO visit (Theater, Company, `Date`, Username)
    VALUES (i_thName, i_comName, i_visitDate, i_username);
END$$
DELIMITER ;


-- screen 23: user filter visit history
-- THIS IS FOR PHASE 4!
DROP PROCEDURE IF EXISTS user_filter_visitHistory;
DELIMITER $$
CREATE PROCEDURE `user_filter_visitHistory`(IN i_username VARCHAR(50), IN i_minVisitDate DATE, IN i_maxVisitDate DATE, IN i_comName VARCHAR(50))
BEGIN
    DROP TABLE IF EXISTS UserVisitHistory;
    CREATE TABLE UserVisitHistory
	SELECT visit.Theater AS thName, Street AS thStreet, City AS thCity, State AS thState, Zipcode AS thZipcode, visit.Company AS comName, `Date` AS visitDate
    FROM visit
	JOIN theater
	ON visit.Theater = theater.Name AND visit.Company = theater.Company
	WHERE
		(Username = i_username) AND
		(i_comName = "ALL" OR visit.Company = i_comName) AND
        (i_minVisitDate IS NULL OR `Date` >= i_minVisitDate) AND
        (i_maxVisitDate IS NULL OR `Date` <= i_maxVisitDate);
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS load_initial_data;
DELIMITER $$
CREATE PROCEDURE `load_initial_data`()
BEGIN
	SET FOREIGN_KEY_CHECKS = 0;
	TRUNCATE TABLE `visit`;
	TRUNCATE TABLE `customerviewmovie`;
    TRUNCATE TABLE `movieplay`;
	TRUNCATE TABLE `theater`;
	TRUNCATE TABLE `creditcard`;
    TRUNCATE TABLE `customer`;
    TRUNCATE TABLE `manager`;
	TRUNCATE TABLE `admin`;
    TRUNCATE TABLE `employee`;
    TRUNCATE TABLE `movie`;
    TRUNCATE TABLE `company`;
    TRUNCATE TABLE `user`;
    INSERT INTO `user` VALUES ('calcultron','Dwight','Schrute','77c9749b451ab8c713c48037ddfbb2c4','approved'),('calcultron2','Jim','Halpert','8792b8cf71d27dc96173b2ac79b96e0d','approved'),('calcwizard','Issac','Newton','0d777e9e30b918e9034ab610712c90cf','approved'),('clarinetbeast','Squidward','Tentacles','c8c605999f3d8352d7bb792cf3fdb25b','declined'),('cool_class4400','A. TA','Washere','77c9749b451ab8c713c48037ddfbb2c4','approved'),('DNAhelix','Rosalind','Franklin','ca94efe2a58c27168edf3d35102dbb6d','approved'),('does2Much','Carl','Gauss','00cedcf91beffa9ee69f6cfe23a4602d','approved'),('eeqmcsquare','Albert','Einstein','7c5858f7fcf63ec268f42565be3abb95','approved'),('entropyRox','Claude','Shannon','c8c605999f3d8352d7bb792cf3fdb25b','approved'),('fatherAI','Alan','Turing','0d777e9e30b918e9034ab610712c90cf','approved'),('fullMetal','Edward','Elric','d009d70ae4164e8989725e828db8c7c2','approved'),('gdanger','Gary','Danger','3665a76e271ada5a75368b99f774e404','declined'),('georgep','George P.','Burdell','bbb8aae57c104cda40c93843ad5e6db8','approved'),('ghcghc','Grace','Hopper','9f0863dd5f0256b0f586a7b523f8cfe8','approved'),('ilikemoney$$','Eugene','Krabs','7c5858f7fcf63ec268f42565be3abb95','approved'),('imbatman','Bruce','Wayne','9f0863dd5f0256b0f586a7b523f8cfe8','approved'),('imready','Spongebob','Squarepants','ca94efe2a58c27168edf3d35102dbb6d','approved'),('isthisthekrustykrab','Patrick','Star','134fb0bf3bdd54ee9098f4cbc4351b9a','approved'),('manager1','Manager','One','e58cce4fab03d2aea056398750dee16b','approved'),('manager2','Manager','Two','ba9485f02fc98cdbd2edadb0aa8f6390','approved'),('manager3','Three','Three','6e4fb18b49aa3219bef65195dac7be8c','approved'),('manager4','Four','Four','d61dfee83aa2a6f9e32f268d60e789f5','approved'),('notFullMetal','Alphonse','Elric','d009d70ae4164e8989725e828db8c7c2','approved'),('programerAAL','Ada','Lovelace','ba9485f02fc98cdbd2edadb0aa8f6390','approved'),('radioactivePoRa','Marie','Curie','e5d4b739db1226088177e6f8b70c3a6f','approved'),('RitzLover28','Abby','Normal','8792b8cf71d27dc96173b2ac79b96e0d','approved'),('smith_j','John','Smith','77c9749b451ab8c713c48037ddfbb2c4','pending'),('texasStarKarate','Sandy','Cheeks','7c5858f7fcf63ec268f42565be3abb95','declined'),('thePiGuy3.14','Archimedes','Syracuse','e11170b8cbd2d74102651cb967fa28e5','approved'),('theScienceGuy','Bill','Nye','c8c605999f3d8352d7bb792cf3fdb25b','approved');
    INSERT INTO `company` VALUES ('4400 Theater Company'),('AI Theater Company'),('Awesome Theater Company'),('EZ Theater Company');
    INSERT INTO `movie` VALUES ('4400 The Movie','2019-08-12',130),('Avengers: Endgame','2019-04-26',181),('Calculus Returns: A ML Story','2019-09-19',314),('George P Burdell\'s Life Story','1927-08-12',100),('Georgia Tech The Movie','1985-08-13',100),('How to Train Your Dragon','2010-03-21',98),('Spaceballs','1987-06-24',96),('Spider-Man: Into the Spider-Verse','2018-12-01',117),('The First Pokemon Movie','1998-07-19',75),('The King\'s Speech','2010-11-26',119);
    INSERT INTO `employee` VALUES ('calcultron'),('cool_class4400'),('entropyRox'),('fatherAI'),('georgep'),('ghcghc'),('imbatman'),('manager1'),('manager2'),('manager3'),('manager4'),('radioactivePoRa');
    INSERT INTO `admin` VALUES ('cool_class4400');
    INSERT INTO `manager` VALUES ('calcultron','123 Peachtree St','Atlanta','GA','30308','EZ Theater Company'),('entropyRox','200 Cool Place','San Francisco','CA','94016','4400 Theater Company'),('fatherAI','456 Main St','New York','NY','10001','EZ Theater Company'),('georgep','10 Pearl Dr','Seattle','WA','98105','4400 Theater Company'),('ghcghc','100 Pi St','Pallet Town','KS','31415','AI Theater Company'),('imbatman','800 Color Dr','Austin','TX','78653','Awesome Theater Company'),('manager1','123 Ferst Drive','Atlanta','GA','30332','4400 Theater Company'),('manager2','456 Ferst Drive','Atlanta','GA','30332','AI Theater Company'),('manager3','789 Ferst Drive','Atlanta','GA','30332','4400 Theater Company'),('manager4','000 Ferst Drive','Atlanta','GA','30332','4400 Theater Company'),('radioactivePoRa','100 Blu St','Sunnyvale','CA','94088','4400 Theater Company');
    INSERT INTO `customer` VALUES ('calcultron'),('calcultron2'),('calcwizard'),('clarinetbeast'),('cool_class4400'),('DNAhelix'),('does2Much'),('eeqmcsquare'),('entropyRox'),('fullMetal'),('georgep'),('ilikemoney$$'),('imready'),('isthisthekrustykrab'),('notFullMetal'),('programerAAL'),('RitzLover28'),('thePiGuy3.14'),('theScienceGuy');
    INSERT INTO `creditcard` VALUES ('1111111111000000','calcultron'),('1111111100000000','calcultron2'),('1111111110000000','calcultron2'),('1111111111100000','calcwizard'),('2222222222000000','cool_class4400'),('2220000000000000','DNAhelix'),('2222222200000000','does2Much'),('2222222222222200','eeqmcsquare'),('2222222222200000','entropyRox'),('2222222222220000','entropyRox'),('1100000000000000','fullMetal'),('1111111111110000','georgep'),('1111111111111000','georgep'),('1111111111111100','georgep'),('1111111111111110','georgep'),('1111111111111111','georgep'),('2222222222222220','ilikemoney$$'),('2222222222222222','ilikemoney$$'),('9000000000000000','ilikemoney$$'),('1111110000000000','imready'),('1110000000000000','isthisthekrustykrab'),('1111000000000000','isthisthekrustykrab'),('1111100000000000','isthisthekrustykrab'),('1000000000000000','notFullMetal'),('2222222000000000','programerAAL'),('3333333333333300','RitzLover28'),('2222222220000000','thePiGuy3.14'),('2222222222222000','theScienceGuy');
    INSERT INTO `theater` VALUES ('4400 Theater Company','Cinema Star',4,'100 Cool Place','San Francisco','CA','94016','entropyRox'),('4400 Theater Company','Jonathan\'s Movies',2,'67 Pearl Dr','Seattle','WA','98101','georgep'),('4400 Theater Company','Star Movies',5,'4400 Rocks Ave','Boulder','CA','80301','radioactivePoRa'),('AI Theater Company','ML Movies',3,'314 Pi St','Pallet Town','KS','31415','ghcghc'),('Awesome Theater Company','ABC Theater',5,'880 Color Dr','Austin','TX','73301','imbatman'),('EZ Theater Company','Main Movies',3,'123 Main St','New York','NY','10001','fatherAI'),('EZ Theater Company','Star Movies',2,'745 GT St','Atlanta','GA','30332','calcultron');
    INSERT INTO `movieplay` VALUES ('4400 The Movie','2019-08-12','2019-09-12','Cinema Star','4400 Theater Company'),('4400 The Movie','2019-08-12','2019-10-12','ABC Theater','Awesome Theater Company'),('4400 The Movie','2019-08-12','2019-08-12','Star Movies','EZ Theater Company'),('Calculus Returns: A ML Story','2019-09-19','2019-10-10','ML Movies','AI Theater Company'),('Calculus Returns: A ML Story','2019-09-19','2019-12-30','ML Movies','AI Theater Company'),('George P Burdell\'s Life Story','1927-08-12','2010-05-20','Cinema Star','4400 Theater Company'),('George P Burdell\'s Life Story','1927-08-12','2019-07-14','Main Movies','EZ Theater Company'),('George P Burdell\'s Life Story','1927-08-12','2019-10-22','Main Movies','EZ Theater Company'),('Georgia Tech The Movie','1985-08-13','2019-09-30','Cinema Star','4400 Theater Company'),('Georgia Tech The Movie','1985-08-13','1985-08-13','ABC Theater','Awesome Theater Company'),('How to Train Your Dragon','2010-03-21','2010-04-02','Cinema Star','4400 Theater Company'),('How to Train Your Dragon','2010-03-21','2010-03-22','Main Movies','EZ Theater Company'),('How to Train Your Dragon','2010-03-21','2010-03-23','Main Movies','EZ Theater Company'),('How to Train Your Dragon','2010-03-21','2010-03-25','Star Movies','EZ Theater Company'),('Spaceballs','1987-06-24','2000-02-02','Cinema Star','4400 Theater Company'),('Spaceballs','1987-06-24','2010-04-02','ML Movies','AI Theater Company'),('Spaceballs','1987-06-24','2023-01-23','ML Movies','AI Theater Company'),('Spaceballs','1987-06-24','1999-06-24','Main Movies','EZ Theater Company'),('Spider-Man: Into the Spider-Verse','2018-12-01','2019-09-30','ML Movies','AI Theater Company'),('The First Pokemon Movie','1998-07-19','2018-07-19','ABC Theater','Awesome Theater Company'),('The King\'s Speech','2010-11-26','2019-12-20','Cinema Star','4400 Theater Company'),('The King\'s Speech','2010-11-26','2019-12-20','Main Movies','EZ Theater Company');
    INSERT INTO `customerviewmovie` VALUES ('How to Train Your Dragon','2010-03-21','2010-03-25','Star Movies','EZ Theater Company','1111111111111100'),('How to Train Your Dragon','2010-03-21','2010-04-02','Cinema Star','4400 Theater Company','1111111111111111'),('How to Train Your Dragon','2010-03-21','2010-03-22','Main Movies','EZ Theater Company','1111111111111111'),('How to Train Your Dragon','2010-03-21','2010-03-23','Main Movies','EZ Theater Company','1111111111111111');
    INSERT INTO `visit` VALUES (1,'georgep','Main Movies','EZ Theater Company','2010-03-22'),(2,'calcwizard','Main Movies','EZ Theater Company','2010-03-22'),(3,'calcwizard','Star Movies','EZ Theater Company','2010-03-25'),(4,'imready','Star Movies','EZ Theater Company','2010-03-25'),(5,'calcwizard','ML Movies','AI Theater Company','2010-03-20');
	SET FOREIGN_KEY_CHECKS = 1;
END$$
DELIMITER ;