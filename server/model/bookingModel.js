exports.bookingData =class bookingData{

    constructor(booked_id,user_id,admins_id,booked_data_work,booked_time_start,booked_time_end,state,club_id){
        this.booked_id=booked_id;
        this.user_id=user_id;
        this.admins_id=admins_id;
        this.booked_data_work=booked_data_work;
        this.booked_time_start=booked_time_start;
        this.booked_time_end=booked_time_end;
        this.state=state;
        this.club_id=club_id;

    }

}