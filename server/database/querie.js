exports.queryList = {
  USERS_SIGNUP_QUERY: `INSERT INTO BOOKING.USERS 
    (USER_FIRSTNAME, USER_SURNAME, USER_EMAIL, USER_PASSWORD, USER_PHONE) 
    VALUES($1,$2,$3,$4,$5)`,
  AUTHORIZATION: `SELECT * FROM BOOKING.USERS WHERE USER_EMAIL =$1 AND  USER_PASSWORD =$2`,
  CART_ITEMS: `SELECT B.BOOKED_ID AS bookedId , C.CLUB_NAME AS fieldName ,C.URL_IMAGE AS fieldImage, B.BOOKED_DATE_WORK AS date ,
    B.BOOKED_TIME_START , B.BOOKED_TIME_END , C.CLUB_PRICE AS price
    FROM BOOKING.BOOKED B , BOOKING.CLUB C
    WHERE B.CLUB_ID = C.CLUB_ID AND STATE =FALSE AND B.USER_ID=$1`,
  CLUB_CART_ITEME: `SELECT  CLUB_NAME, CLUB_LOCATION, CLUB_PRICE, URL_IMAGE, CLUB_DESCRIPTION FROM BOOKING.CLUB WHERE club_id=$1`,
  SEARCH_FOR_CLUB: `SELECT CLUB_ID AS id, CLUB_NAME AS name ,CLUB_PRICE AS price,CLUB_LOCATION AS location ,URL_IMAGE AS clubImg,
    CLUB_DESCRIPTION FROM BOOKING.CLUB
    WHERE lower(CLUB_LOCATION)= lower($1)`,
  CLUB_PROFILE: `SELECT CLUB_NAME ,URL_IMAGE, CLUB_DESCRIPTION , CLUB_TIME_WORK_FROM, CLUB_TIME_WORK_TO, CLUB_PRICE 
    FROM BOOKING.CLUB 
    WHERE CLUB_ID =$1`,
  BUSY_TIME: `SELECT  BOOKED_TIME_START AS START_TIME , BOOKED_TIME_END AS END_TIME
    FROM BOOKING.BOOKED 
    WHERE STATE =TRUE   AND CLUB_ID =$1 AND BOOKED_DATE_WORK =$2;`,
  DELETE_CART_ITEM: `DELETE FROM BOOKING.BOOKED WHERE BOOKED_ID=$1`,
  ADD_CART_ITEMS:`INSERT INTO BOOKING.BOOKED 
  (USER_ID, ADMINS_ID, CLUB_ID, BOOKED_DATE_WORK, BOOKED_TIME_START, BOOKED_TIME_END, STATE)
  VALUES($1, $2, $3, $4, $5, $6, FALSE)`,
  ADMINS_ID:`SELECT  ADMINS_ID FROM BOOKING.CLUB WHERE CLUB_ID=$1`,
};
