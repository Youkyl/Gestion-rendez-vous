function connexion(patients, email, password){
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

function registerPatient(patients, patient){
    patients.push(patient);
}

function registerDemandeRDV(demandes, demande){
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

function serchDemandeById(demandes, demandeId){
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


function viewDemandesRDV(demandes, patientId){
    for(let i=0; i<demandes.length; i++){
        if(demandes[i].patientId === patientId){
            console.log("Demande ID:", demandes[i].id, "Specialite:", demandes[i].specialite, "Date de creation:", demandes[i].dateCreation, "Statut:", demandes[i].statut);
        }
    }
}

function viewRDV(rendezVous, patientId){
    console.log("Vos rendez-vous:");
    for(let i=0; i<rendezVous.length; i++){
        if(rendezVous[i].patientId === patientId && rendezVous[i].statut === "accepte"){
            console.log("Rendez-vous ID:", rendezVous[i].id, "Specialite:", rendezVous[i].specialite, "Date de creation:", rendezVous[i].dateCreation);
        }
    }
}

function viewPatientInfo(patient){
    console.log("Informations du patient:");
    console.log("Code patient:", patient.codePatient);
    console.log("Nom:", patient.nom);
    console.log("Prénom:", patient.prenom);
    if (!patient.dateNaissance) {
        console.log("Date de naissance: Non renseignée");
    } else {
        console.log("Date de naissance:", patient.dateNaissance);
    }
    if (!patient.adresse) {
        console.log("Adresse: Non renseignée");
    } else {
        console.log("Adresse:", patient.adresse);
    }
    if (!patient.telephone) {
        console.log("Téléphone: Non renseigné");
    } else {
    console.log("Téléphone:", patient.telephone);
    }
    console.log("Email:", patient.email);
    console.log("Date de création du compte:", patient.dateCreationCompte);

    if (!patient.antecedentsMedicaux || patient.antecedentsMedicaux.length === 0) {
        console.log("Antécédents médicaux: Aucun");
        return;
    } else {
    console.log("Antécédents médicaux:", patient.antecedentsMedicaux.join(", "));
    }
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
    viewDemandesRDV,
    viewRDV,
    viewPatientInfo
};