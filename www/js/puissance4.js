/* Fichier javascript puissance4.js */
/* Autheurs: Xavier NAUNAY & Kevin ABRIAL */
// variables globales :
var joueur;
var grille = new Array(7); // les indices vont de 0 à 6, seuls les indices 1 à 6 correspondent à la grille réelle
// pour créer un tableau à 2 dimensions on crée à la main un second tableau dans le premier :
for (var i = 1; i <= 6; i++) {
    grille[i] = new Array(8);
}

/* valeur score initialise a zero pour les deux joeurs. */
document.getElementById("scoreRouge").value = 0;
document.getElementById("scoreJaune").value = 0;
/* bonus couleur mis a jaune par défaut. */
document.getElementById("ma_balise").style.color = "yellow";

/* function scorePlayerRed pour gerer le score du player red. */
function scorePlayerRed() {
    var scoresRed = document.getElementById("scoreRouge").value;
    scoresRed++;
    document.getElementById("scoreRouge").value = scoresRed;
}

/* function scorePlayerYellow pour gerer le score du player jaune. */
function scorePlayerYellow() {
    var scoresYellow = document.getElementById("scoreJaune").value;
    scoresYellow++;
    document.getElementById("scoreJaune").value = scoresYellow;
}

/* function verificationPions pour verifier les pions. */
function verificationPions() {
    var nonJoue = 0;
    // on verifie chaque ligne et colonnes pour chaque valeur des cellules.
    for (var i = 1; i <= 6; i++) {
        var countX = 0, countY = 0;
        for (var j = 1; j <= 7; j++) {
            countX = grille[i][j] === joueur ? countX + 1 : 0;
            // Il y a une colonne de plus que les lignes.
            if (j !== 7) {
                countY = grille[j][i] === joueur ? countY + 1 : 0;
            }
            // On verifie s'il existe une cellule qui est egale a zero.
            // On incremente la variable nonJoue.
            nonJoue += grille[i][j] === 0 ? 1 : 0;
            if (countX === 4 || countY === 4) {
                alert('Joueur ' + joueur + ' a gagne');
                joueur === 1 ? scorePlayerYellow() : scorePlayerRed();
                remiseZero();
                return;
            }
        }
    }
    // On change le joueur si personne a gagner.
    joueur = joueur === 1 ? 2 : 1;
    // On verifie si il y a match nul entre les deux joueurs.
    if (nonJoue === 0) {
        alert('Match nul');
        remiseZero();
    }
}

/* function remiseZero : pour commencer une nouvelle partie. */
function remiseZero() {
    for (var i = 1; i <= 6; i++) {
        for (var j = 1; j <= 7; j++) {
            var cellule = i + ":" + j;
            document.getElementById(cellule).innerHTML = '<img src="img/images/blanc.png" class="img-responsive center-block" />';
            grille[i][j] = 0;
        }
    }
    joueur = 1;
    document.getElementById("ma_balise").innerHTML = 'Couleur du prochain pion joué : Jaune';
    document.getElementById("ma_balise").style.color = "yellow";
    document.getElementById("score").innerHTML = '&nbsp;';
}


/* function jouerPion pour jouer un pion */
function jouerPion(i) {
    // extrait le 1er et 3ème caractère dans la chaine i qui est de la forme 2:5
    y = eval(i.charAt(0));
    x = eval(i.charAt(2));

    //recherche le nombre de pions déjà joués dans cette colonne :
    n = 0;
    for (j = 1; j <= 6; j++) {
        if (grille[j][x] !== 0) {
            n++;
        }
    }
    n = 6 - n;

    if (n === 0) {
        document.getElementById("score").innerHTML = 'La colonne est pleine';
    }
    else {
        document.getElementById("score").innerHTML = '&nbsp;';
        var cellule = n + ":" + x;
        if (joueur === 1) {
            document.getElementById(cellule).innerHTML = '<img src="img/images/jaune.png" class="img-responsive center-block" />';
            grille[n][x] = 1;
            document.getElementById("ma_balise").innerHTML = 'Couleur du prochain pion joué : Rouge';
            document.getElementById("ma_balise").style.color = "red";
        }
        else {
            document.getElementById(cellule).innerHTML = '<img src="img/images/rouge.png" class="img-responsive center-block" />';
            grille[n][x] = 2;
            document.getElementById("ma_balise").innerHTML = 'Couleur du prochain pion joué : Jaune';
            document.getElementById("ma_balise").style.color = "yellow";
        }
        verificationPions();
    }
}


/* Programme principale */
var placeholder = document.getElementById('placeholder');
var table = "<table border=\"3\" cellpadding=\"0\" cellspacing=\"0\" bordercolor=\"#003300\" class='table'>";
for (i = 1; i <= 6; i++) {
    table += "<tr>";
    for (j = 1; j <= 7; j++) {
        table += "<td width=\"60\" height=\"60\" id=\"" + i + ":" + j + "\" onClick='jouerPion(\"" + i + ":" + j + "\")'><img src=\"img/images/blanc.png\" class=\"img-responsive center-block\" /></td>";
    }
    table += "</tr>";
}
table += "</table>";
placeholder.innerHTML += table;
remiseZero();
