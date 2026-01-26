const readlineSync = require('readline-sync');

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
    console.log ("7- Se deconnecter");
}

function main() {
    let choixConnexion;
    let patients = [];
    let antecedents = [];
    do {
        menuConnexion();
        choixConnexion = readlineSync.question("Veuillez faire un choix: ");
        switch (choixConnexion) {
            case '1':
                console.clear(); 
                console.log("Creation de compte Patient");
                let newPatient = createPatient();
                registerPatient(patients, newPatient);
                console.clear();
                console.log("Compte Patient cree avec succes!");
                console.log("Votre code patient est:", newPatient.codePatient);
                break;
            case '2':
                console.clear(); 
                console.log("Connexion Patient");
                let email = readlineSync.question("Veuillez entrer votre email: ");
                let password = readlineSync.question("Veuillez entrer votre mot de passe: ");
                let patientConnect = connexion(patients, email, password);
                if(patientConnect){
                    console.log("Connexion reussie!");
                    let choixPrincipal;
                    do {
                        menuPrincipal(patientConnect);
                        choixPrincipal = readlineSync.question("Veuillez faire un choix: ");
                        switch (choixPrincipal) {
                            case '1':
                                console.clear();
                                console.log("Ajouter des informations personnelles");
                                completePatientInfo(patientConnect);

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
                                break;
                            case '4':
                                console.clear();
                                console.log("Faire une demande de rendez-vous");
                                break;
                            case '5':
                                console.clear();
                                console.log("Consulter vos demandes de rendez-vous");
                                break;
                            case '6':
                                console.clear();
                                console.log("Consulter vos rendez-vous");
                                break;
                            case '7':
                                
                                console.log("Deconnexion");
                                break;
                            default:
                                console.log("Choix invalide, veuillez reessayer.");
                        }
                    } while (choixPrincipal !== '7');

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

function createPatient(){
    // Les patients sont stockes dans un objet
    // un pattient a pour proprietes: 
    // id, nom, prenom, dateNaissance, adresse, telephone, email, password, date de creation du compte, antecedentsMedicaux (tableau), son code patient
    // Relation OneToMany avec l'objet DemandeRDV
    // L'id est auto-incremente
    // le code patient est genere aleatoirement

    let patient = {};
    patient.id = generateId();
    patient.codePatient = generatePatientCode();
    patient.dateCreationCompte = new Date().toLocaleDateString();

    patient.nom = readlineSync.question("Veuillez entrer votre nom: ");
    patient.prenom = readlineSync.question("Veuillez entrer votre prenom: ");

    patient.email = readlineSync.question("Veuillez entrer votre email: ");
    patient.password = readlineSync.question("Veuillez entrer votre mot de passe: ");

    return patient;
}


function registerPatient(patients, patient){
    patients.push(patient);
}


function connexion(patients, email, password){
    for(let i=0; i<patients.length; i++){
        if(patients[i].email === email && patients[i].password === password){
            return patients[i];
        }
    }
    return null;
}


function completePatientInfo(patient){
    console.log("Ajouter des informations personnelles pour le patient:", patient.nom, patient.prenom);
    patient.dateNaissance = readlineSync.question("Veuillez entrer votre date de naissance (JJ/MM/AAAA): ");
    patient.adresse = readlineSync.question("Veuillez entrer votre adresse: ");
    patient.telephone = readlineSync.question("Veuillez entrer votre numero de telephone: ");
   // patient.antecedentsMedicaux = [];
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


function viewPatientInfo(patient){
    console.log("Informations du patient:");
    console.log("Code patient:", patient.codePatient);
    console.log("Nom:", patient.nom);
    console.log("Prénom:", patient.prenom);
    console.log("Date de naissance:", patient.dateNaissance);
    console.log("Adresse:", patient.adresse);
    console.log("Téléphone:", patient.telephone);
    console.log("Email:", patient.email);
    console.log("Date de création du compte:", patient.dateCreationCompte);
   // console.log("Antécédents médicaux:", patient.antecedentsMedicaux.join(", "));
}


main();