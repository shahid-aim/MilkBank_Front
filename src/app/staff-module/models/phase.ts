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
    pre_result:Boolean;
    pooling : number[];
    temprature : number
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


export class RawCollectionUpdate{
    // Modal to Update Exisitng Raw Collection after pooling
    index : number
    update_volume : number
    constructor(index:number, update_volume : number){
        this.index = index
        this.update_volume = update_volume
    }

}