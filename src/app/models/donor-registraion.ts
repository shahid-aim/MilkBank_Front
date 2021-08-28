export class DonorRegistration {
    public DOB: Date
    public delivery_type: String
    public DOD: Date
    public document_type: String
    public document_number: number
}

export class ContactInformation {
    address: string
    city: string
    taluka: string
    district: string
    pincode: string
}

export class MedicalHistory {
    nicotine_alchol_consumption: boolean
    blood_transfusion: boolean
    fever_or_rashes: boolean
    acute_disease: boolean
    hiv_hbag_disease: boolean
}