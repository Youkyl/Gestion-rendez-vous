let patients = [];
let demandes = [];

function connexion(email, password){
    for(let i=0; i<patients.length; i++){
        if(patients[i].email === email && patients[i].password === password){
            return patients[i];
        }
    }
    return null;
}

function createPatient(nom, prenom, email, password){

    let patient = {};
    patient.id = generateId();
    patient.codePatient = generatePatientCode();
    patient.dateCreationCompte = new Date().toLocaleDateString();

    patient.nom = nom;
    patient.prenom = prenom;
    patient.email = email;
    patient.password = password;

    return patient;
}

function createDemandeRDV(patientId, specialite){
    let demande = {};
    demande.id = generateId();
    demande.patientId = patientId;
    demande.dateCreation = new Date().toLocaleDateString();
    demande.specialite = specialite;
    demande.statut = "en attente";
    return demande;
}

function registerPatient(patient){
    patients.push(patient);
}

function registerDemandeRDV(demande){
    demandes.push(demande);
}

function addAntecedent(patient, antecedent){
    if (!patient.antecedentsMedicaux) {
        patient.antecedentsMedicaux = [];
    }
    patient.antecedentsMedicaux.push(antecedent);
}

function completePatientInfo(patient, dateNaissance, adresse, telephone){
    patient.dateNaissance = dateNaissance;
    patient.adresse = adresse;
    patient.telephone = telephone;
}

function generateId() {
    return Math.floor(Math.random() * 100000);
}

function generatePatientCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

function serchDemandeById(demandeId){
    for(let i=0; i<demandes.length; i++){
        if(demandes[i].id === demandeId){
            return demandes[i];
        }
    }
    return null;
}

function changeDemandeStatut(demande, statut){
    demande.statut = statut;
}

function getAllPatien(){
    return patients;
}

function getAllDemande(){
    return demandes;
}



module.exports = {
    connexion,
    createPatient,
    createDemandeRDV,
    registerPatient,
    registerDemandeRDV,
    addAntecedent,
    completePatientInfo,
    generateId,
    generatePatientCode,
    serchDemandeById,
    changeDemandeStatut,
    getAllDemande,
    getAllPatien
};