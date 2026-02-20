import { StorageModel } from './StorageModel.js';

let patients = [];
let demandes = [];

const patientStorage = new StorageModel('patients');
const demandeStorage = new StorageModel('demandes');

export function connexion(email, password){
    for(let i=0; i<patients.length; i++){
        if(patients[i].email === email && patients[i].password === password){
            return patients[i];
        }
    }
    return null;
}

export function createPatient(nom, prenom, email, password){

    let patient = {};
    patient.id = generateId();
    patient.codePatient = generatePatientCode();
    patient.dateCreationCompte = new Date().toLocaleDateString();

    patient.nom = nom;
    patient.prenom = prenom;
    patient.email = email;
    patient.password = password;

    registerPatient(patient);

    return patient;
}

export function createDemandeRDV(patientId, specialite){
    let demande = {};
    demande.id = generateId();
    demande.patientId = patientId;
    demande.dateCreation = new Date().toLocaleDateString();
    demande.specialite = specialite;
    demande.statut = "en attente";
    return demande;
}

export function registerPatient(patient){
    patientStorage.addItem(patient);
}

export function registerDemandeRDV(demande){
    demandeStorage.addItem(demande);
}

export function addAntecedent(patient, antecedent){
    if (!patient.antecedentsMedicaux) {
        patient.antecedentsMedicaux = [];
    }
    patient.antecedentsMedicaux.push(antecedent);
}

export function completePatientInfo(patient, dateNaissance, adresse, telephone){
    patient.dateNaissance = dateNaissance;
    patient.adresse = adresse;
    patient.telephone = telephone;
}

export function generateId() {
    return Math.floor(Math.random() * 100000);
}

export function generatePatientCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

export function serchDemandeById(demandeId){
    for(let i=0; i<demandes.length; i++){
        if(demandes[i].id === demandeId){
            return demandes[i];
        }
    }
    return null;
}

export function changeDemandeStatut(demande, statut){
    demande.statut = statut;
}

export function getAllPatien(){
    return patients;
}

export function getAllDemande(){
    return demandes;
}



// module.exports = {
//     connexion,
//     createPatient,
//     createDemandeRDV,
//     registerPatient,
//     registerDemandeRDV,
//     addAntecedent,
//     completePatientInfo,
//     generateId,
//     generatePatientCode,
//     serchDemandeById,
//     changeDemandeStatut,
//     getAllDemande,
//     getAllPatien
// };