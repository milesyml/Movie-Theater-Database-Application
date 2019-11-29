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
DROP PROCEDURE IF EXISTS customer_add_creditcard;
DELIMITER $$
CREATE PROCEDURE `customer_add_creditcard`(IN i_username VARCHAR(50), IN i_creditCardNum CHAR(16))
BEGIN
		INSERT INTO creditcard (username, creditcardnumber) VALUES (i_username, i_creditCardNum);
END$$
DELIMITER ;

-- screen 5: manager-only register
DROP PROCEDURE IF EXISTS manager_only_register;
DELIMITER $$
CREATE PROCEDURE `manager_only_register`(IN i_username VARCHAR(50), IN i_password VARCHAR(50), IN i_firstname VARCHAR(50), IN i_lastname VARCHAR(50), IN i_comName VARCHAR(50), IN i_empStreet VARCHAR(50), IN i_empCity VARCHAR(50), IN i_empState CHAR(2), IN i_empZipcode CHAR(5))
BEGIN
		INSERT INTO user (username, password, firstname, lastname) VALUES (i_username, MD5(i_password), i_firstname, i_lastname);
		INSERT INTO employee (username) VALUES (i_username);
        INSERT INTO manager (username, street, city, state, zipcode, company) VALUES (i_username, i_empStreet, i_empCity, i_empState, i_empZipcode, i_comName);
END$$
DELIMITER ;

-- screen 6: manager-customer register
DROP PROCEDURE IF EXISTS manager_customer_register;
DELIMITER $$
CREATE PROCEDURE `manager_customer_register`(IN i_username VARCHAR(50), IN i_password VARCHAR(50), IN i_firstname VARCHAR(50), IN i_lastname VARCHAR(50), IN i_comName VARCHAR(50), IN i_empStreet VARCHAR(50), IN i_empCity VARCHAR(50), IN i_empState CHAR(2), IN i_empZipcode CHAR(5))
BEGIN
		INSERT INTO user (username, password, firstname, lastname) VALUES (i_username, MD5(i_password), i_firstname, i_lastname);
		INSERT INTO employee (username) VALUES (i_username);
        INSERT INTO manager (username, street, city, state, zipcode, company) VALUES (i_username, i_empStreet, i_empCity, i_empState, i_empZipcode, i_comName);
		INSERT INTO customer (username) VALUES (i_username);
END$$
DELIMITER ;

-- screen 6: manager-customer add credit card
DROP PROCEDURE IF EXISTS manager_customer_add_creditcard;
DELIMITER $$
CREATE PROCEDURE `manager_customer_add_creditcard`(IN i_username VARCHAR(50), IN i_creditCardNum CHAR(16))
BEGIN
		INSERT INTO creditcard (username, creditcardnumber) VALUES (i_username, i_creditCardNum);
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
-- error here, table should be empty when a manager doesn't manage theater yet.
-- Is the current version correct???
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
			ON A.Theater = movieplay.Theater AND A.Company = movieplay.Company
			WHERE 
				(i_movName ="" OR Locate(i_movName, Movie) > 0) AND
				(i_minMovReleaseDate IS NULL OR movieplay.ReleaseDate >= i_minMovReleaseDate) AND 
				(i_maxMovReleaseDate IS NULL OR movieplay.ReleaseDate <= i_maxMovReleaseDate) AND
				(i_minMovPlayDate IS NULL OR PlayDate >= i_minMovPlayDate) AND 
				(i_maxMovPlayDate IS NULL OR PlayDate <= i_maxMovPlayDate))
			AS B
		ON movie.Name = B.movName  AND movie.ReleaseDate = B.movReleaseDate
		WHERE (i_minMovDuration IS NULL OR Duration >= i_minMovDuration) AND
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



-- screen 19: manager schedule movie [How to handle the logical constraint: movie PLAY DATE late than release date]
DROP PROCEDURE IF EXISTS manager_schedule_mov;
DELIMITER $$
CREATE PROCEDURE `manager_schedule_mov`(IN i_manUsername VARCHAR(50), IN i_movName VARCHAR(50), IN i_movReleaseDate Date, IN i_movPlayDate Date)
BEGIN
		INSERT INTO MoviePlay (Movie,  ReleaseDate, PlayDate, Theater, Company) 
			SELECT i_movName, i_movReleaseDate, i_movPlayDate, Name, Company
			FROM Theater
			WHERE ManagerUserName = i_manUsername;
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
DROP PROCEDURE IF EXISTS customer_view_mov;
DELIMITER $$
CREATE PROCEDURE `customer_view_mov`(IN i_creditCardNum CHAR(16), IN i_movName VARCHAR(50), IN i_movReleaseDate Date, IN i_thName VARCHAR(50), IN i_comName VARCHAR(50), IN i_movPlayDate Date)
BEGIN
		INSERT INTO customerviewmovie (Movie,  ReleaseDate, ViewDate, Theater, Company, CreditCardNumber) 
		VALUES (i_movName, i_movReleaseDate, i_movPlayDate, i_thName, i_comName, i_creditCardNum); 
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
DROP PROCEDURE IF EXISTS user_filter_visitHistory;
DELIMITER $$
CREATE PROCEDURE `user_filter_visitHistory`(IN i_username VARCHAR(50), IN i_minVisitDate DATE, IN i_maxVisitDate DATE)
BEGIN
    DROP TABLE IF EXISTS UserVisitHistory;
    CREATE TABLE UserVisitHistory
	SELECT visit.Theater AS thName, Street AS thStreet, City AS thCity, State AS thState, Zipcode AS thZipcode, visit.Company AS comName, `Date` AS visitDate
    FROM visit
	JOIN theater
	ON visit.Theater = theater.Name AND visit.Company = theater.Company
	WHERE
		(Username = i_username) AND
        (i_minVisitDate IS NULL OR `Date` >= i_minVisitDate) AND
        (i_maxVisitDate IS NULL OR `Date` <= i_maxVisitDate);
END$$
DELIMITER ;