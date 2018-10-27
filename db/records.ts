export interface MedicalRecord {
    id: string;
    ownderId: string;
}
export interface MedicalRecords {
    [id: string]: MedicalRecord
}
export const records: MedicalRecords = {
    "sdlcpvfortdfpokasas": {
        id: "jose.ople",
        ownderId: "jose.ople"
    }
}