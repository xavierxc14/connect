/* Fichier javascript puissance4.js */

// variables globales :
var grille= new Array(7); // les indices vont de 0 à 6, seuls les indices 1 à 6 correspondent à la grille réelle
// pour créer un tableau à 2 dimensions on crée à la main un second tableau dans le premier :
for (i=0;i<=6;i++) {
	grille[i]= new Array(8);
}



function verification_4_pions(){
    for (i=1;i<=6;i++) {
        for (j=1;j<=7;j++) {
        cellule=i+":"+j;
        //alert(cellule);
        //alert(grille[i][j]);
        }
    }
}


/* function remise_a_zero : pour commencer une nouvelle partie. */
function remise_a_zero(){
    for (i=1;i<=6;i++) {
	    for (j=1;j<=7;j++) {
		    cellule=i+":"+j;
		    document.getElementById(cellule).innerHTML = '<img src="img/images/blanc.png" width="60" height="60" />';
		    grille[i][j]=0;
		}
	joueur=1;
	document.getElementById("ma_balise").innerHTML = 'Couleur du prochain pion joué : JAUNE';
	}
	document.getElementById("score").innerHTML = '&nbsp;';
}



function jouer_pion(i){
    verification_4_pions();
    // extrait le 1er et 3ème caractère dans la chaine i qui est de la forme 2:5
	y=eval(i.charAt(0));
	x=eval(i.charAt(2));

	//recherche le nombre de pions déjà joués dans cette colonne :
	n=0;
	for (j=1;j<=6;j++){
        if (grille[j][x]!=0) {
        n++;
        }
	}
    n=6-n;

	if (n==0){
		document.getElementById("score").innerHTML = 'La colonne est pleine';
	}
	else{
		document.getElementById("score").innerHTML = '&nbsp;';
		cellule=n+":"+x;
		if (joueur==1){
		 document.getElementById(cellule).innerHTML = '<img src="img/images/jaune.png" width="60" height="60" />';
		 grille[n][x]=1;
		 joueur=2;
		 document.getElementById("ma_balise").innerHTML = 'Couleur du prochain pion joué : ROUGE';
		}
		else{
		 document.getElementById(cellule).innerHTML = '<img src="img/images/rouge.png" width="60" height="60" />';
		 grille[n][x]=2;
		 joueur=1;
		 document.getElementById("ma_balise").innerHTML = 'Couleur du prochain pion joué : Jaune';
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Programme principal
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.write("<center><table border=\"3\" cellpadding=\"0\" cellspacing=\"0\" bordercolor=\"#003300\">");
for (i=1;i<=6;i++){
 	document.write("<tr>");
	for (j=1;j<=7;j++){
 		document.write("<td width=\"60\" height=\"60\" id=\""+i+":"+j+"\" onClick='jouer_pion(\""+i+":"+j+"\")'><img src=\"img/images/blanc.png\" width=\"60\" height=\"60\" /></td>");
		}
	document.write("</tr>");
	}
document.write("</table></center>");
remise_a_zero()
