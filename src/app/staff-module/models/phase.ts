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
    total_volume : number
    staff_id : number
    raw_collection_id : PoolRawCollectionId[] = []
}

export class PoolRawCollectionId{
    id : number
    volume_used : number

    constructor(id : number, volume_used : number){
        this.id = id
        this.volume_used = volume_used
    }
}

export class CreatePasturization{
    pasturization_date:Date;
    pre_result:boolean;
    pooling : number[];

}

export class CreateBottling{
    pasturization_id:number;
    pool_id : number
    date_added:Date;
    total_units : number
    total_volume:any;
    staff:number;
}

export class Paginator{
    "page_start" : number
    "page_end" :number
}

export class PasturizationPaginator{
    "screen" : string
    "page_start" : number
    "page_end" :number
}

export class PasturizationTest{
    id : number
    test_sample_qty : number
    test_sample_sent_date : Date
    testing_lab_id : number

}

export class TestResult{
    id : number
    test_cert_no : string
    test_result_date : Date
    test_result : boolean
    test_remarks : string
}

