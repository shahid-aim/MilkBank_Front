export class CreateRawCollection{
    donor: number
    staff: number
    units : number
    recevingSite: string
    breastPumpType: string
    volumeCollected : number
    createdDateTime : Date 
}

export class CreatePool{
    mixing_date : Date
    total_units : number
    total_volume : number
    test_sample_qty : number
    test_sample_sent_date : Date
        
    staff_id : number
    testing_lab_id : number
    raw_collection_id : number[]
}

export class TestResult{
    pool_id : number
    test_cert_no : string
    test_result_date : Date
    test_result : boolean
    test_remarks : string
}
export class CreatePasturization{
    pasturization_date:Date;
    pre_result:boolean;
    pooling:number;

}
//pasturization post result
export class PoolTest{
    pool_id : number
    test_sample_qty : number
    test_sample_sent_date : Date
    testing_lab_id : number

}
export class createBottling{
    pasturization_id:number;
    date_added:Date;
   total_volume:any;
   staff:string;
}


