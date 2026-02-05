import { createPatient, createDemandeRDV, serchDemandeById, changeDemandeStatut, addAntecedent, completePatientInfo, registerPatient, registerDemandeRDV, connexion, getAllPatien, getAllDemande } from './service.js';

import readlineSync from 'readline-sync';

function menuConnexion() {
    console.log ("Bienvenue dans le gestionnaire de Rendez-vous Patient");
    console.log ("1- Creer un compte Patient");
    console.log ("2- Se connecter");
    console.log ("3- Quitter");
}


function menuPrincipal(patient) {
    console.log ("Bienvenue", patient.nom, patient.prenom, "dans votre espace Patient");
    console.log ("1- Ajouter des informations personnelles");
    console.log ("2- voir vos informations personnelles");
    console.log ("3- Ajouter des antecedents medicaux");
    console.log ("4- Faire une demande de rendez-vous");
    console.log ("5- Consulter vos demandes de rendez-vous");
    console.log ("6- Consulter vos rendez-vous");
    console.log ("7- Chnager le statut d'une demande de rendez-vous");
    console.log ("8- Se deconnecter");
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

export function main() {
    let choixConnexion;
    let patients = getAllPatien();
    let demandes = getAllDemande();
    do {
        menuConnexion();
        choixConnexion = readlineSync.question("Veuillez faire un choix: ");
        switch (choixConnexion) {
            case '1':
                console.clear(); 
                console.log("Creation de compte Patient");

                let nom = readlineSync.question("Veuillez entrer votre nom: ");
                let prenom = readlineSync.question("Veuillez entrer votre prenom: ");
                let email = readlineSync.question("Veuillez entrer votre email: ");
                let password = readlineSync.question("Veuillez entrer votre mot de passe: ");

                let newPatient = createPatient(nom, prenom, email, password);
                registerPatient(newPatient);
                console.clear();
                console.log("Compte Patient cree avec succes!");
                console.log("Votre code patient est:", newPatient.codePatient);
                break;
            case '2':
                console.clear(); 
                console.log("Connexion Patient");
                let emailpatient = readlineSync.question("Veuillez entrer votre email: ");
                let passwordPatient = readlineSync.question("Veuillez entrer votre mot de passe: ");
                let patientConnect = connexion(emailpatient, passwordPatient);
                if(patientConnect){
                    console.log("Connexion reussie!");
                    let choixPrincipal;
                    do {
                        menuPrincipal(patientConnect);
                        choixPrincipal = readlineSync.question("Veuillez faire un choix: ");
                        switch (choixPrincipal) {
                            case '1':
                                console.clear();
                                
                                console.log("Ajouter des informations personnelles pour le patient:", patientConnect.nom, patientConnect.prenom); 

                                let dateNaissance = readlineSync.question("Veuillez entrer votre date de naissance (JJ/MM/AAAA): ");
                                let adresse = readlineSync.question("Veuillez entrer votre adresse: ");
                                let telephone = readlineSync.question("Veuillez entrer votre numero de telephone: ");
                                completePatientInfo(patientConnect, dateNaissance, adresse, telephone);
                                break; 
                            case '2':
                                console.clear();
                                console.log("Voir vos informations personnelles");
                                viewPatientInfo(patientConnect);
                                break;
                            case '3':
                                console.clear();
                                console.log("Ajouter des antecedents medicaux");
                                let antecedent = readlineSync.question("Veuillez entrer un antecedent medical: ");
                                addAntecedent(patientConnect, antecedent);
                                break;
                            case '4':
                                console.clear();
                                console.log("Faire une demande de rendez-vous");
                                let specialite = readlineSync.question("Veuillez entrer la specialite medicale: ");
                                let demande = createDemandeRDV(patientConnect.id, specialite);
                                registerDemandeRDV(demande);
                                console.log("Demande de rendez-vous enregistree avec succes!");
                                break;
                            case '5':
                                console.clear();
                                console.log("Consulter vos demandes de rendez-vous");
                                viewDemandesRDV(demandes, patientConnect.id);
                                break;
                            case '6':
                                console.clear();
                                console.log("Consulter vos rendez-vous");
                                viewRDV(demandes, patientConnect.id);
                                break;
                            case '7':
                                console.clear();
                                console.log("Changer le statut d'une demande de rendez-vous");
                                let demandeId = parseInt(readlineSync.question("Veuillez entrer l'ID de la demande de rendez-vous: "));
                                let demandeTrouvee = serchDemandeById(demandeId);
                                let statut = readlineSync.question("Veuillez entrer le nouveau statut (accepte/refuse/en attente): ");
                                if (demandeTrouvee) {
                                    changeDemandeStatut(demandeTrouvee, statut);
                                    console.log("Statut de la demande de rendez-vous mis à jour avec succès.");
                                } else {
                                    console.log("Demande de rendez-vous non trouvée.");
                                }
                                break;
                            case '8':
                                console.clear();
                                console.log("Deconnexion");
                                break;
                            default:
                                console.log("Choix invalide, veuillez reessayer.");
                        }
                    } while (choixPrincipal !== '8');

                } else {
                    console.log("Email ou mot de passe incorrect.");
                }
                break;  
            case '3':
                console.log("Quitter le programme");
                break;
            default:
                console.log("Choix invalide, veuillez reessayer.");
        }
    } while (choixConnexion !== '3');
}

// module.exports = {
//     main
// };