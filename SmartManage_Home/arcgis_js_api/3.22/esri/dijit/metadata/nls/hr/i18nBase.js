// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.
//>>built
define("esri/dijit/metadata/nls/hr/i18nBase",{general:{cancel:"Odustani",close:"Zatvori",none:"Nema",ok:"U redu",other:"Ostalo",stamp:"Pe\u010dat",now:"Sada",choose:"Izaberi jedno:"},editor:{noMetadata:"Nema metapodataka za tu stavku.",xmlViewOnly:"Vrstu metapodataka povezanih sa stavkom ne podr\u017eava ure\u0111iva\u010d. Metapodaci moraju biti u formatu za ArcGIS.",editorDialog:{caption:"Metapodaci",captionPattern:"Metapodaci za {title}"},primaryToolbar:{view:"Prikaz",viewXml:"Prikaz XML-a",edit:"Uredi",
initializing:"U\u010ditavanje...",startingEditor:"Pokretanje ure\u0111iva\u010da...",loadingDocument:"U\u010ditavanje dokumenta...",updatingDocument:"A\u017euriranje dokumenta...",generatingView:"Stvaranje prikaza...",errors:{errorGeneratingView:"Do\u0161lo je do pogre\u0161ke tijekom stvaranja prikaza.",errorLoadingDocument:"Do\u0161lo je do pogre\u0161ke tijekom u\u010ditavanja dokumenta."}},changesNotSaved:{prompt:"Dokument ima promjene koje nisu spremljene.",dialogTitle:"Zatvori ure\u0111iva\u010d metapodataka",
closeButton:"Zatvori"},download:{caption:"Preuzmi",dialogTitle:"Preuzmi",prompt:"Kliknite ovdje za preuzimanje datoteke."},load:{caption:"Otvori",dialogTitle:"Otvori",typeTab:"Novi dokument",fileTab:"Otvori datoteku",templateTab:"Predlo\u017eak",itemTab:"Va\u0161a stavka",filePrompt:"Odaberite lokalnu XML datoteku metapodataka za ArcGIS. Metapodaci moraju biti u formatu za ArcGIS.",templatePrompt:"Stvori metapodatke",pullItem:"Popuni metapodatke pojedinostima o stavci.",importWarning:"Odabrana datoteka nije u formatu za ArcGIS. U\u010ditani metapodaci moraju biti u formatu za ArcGIS.",
loading:"U\u010ditavanje...",noMetadata:"Mogu se stvoriti metapodaci za ovu stavku odabirom jedne od sljede\u0107ih opcija.",unrecognizedMetadata:"Vrstu metapodataka povezanih sa stavkom ne podr\u017eava ure\u0111iva\u010d. Podr\u017eani metapodaci mogu se stvoriti odabirom jedne od sljede\u0107ih opcija.",errorLoading:"Do\u0161lo je do pogre\u0161ke tijekom u\u010ditavanja.",warnings:{badFile:"Odabrana datoteka nije se mogla u\u010ditati.",notAnXml:"Odabrana datoteka nije XML datoteka.",notSupported:"Ova vrsta datoteka nije podr\u017eana."}},
save:{caption:"Spremi",dialogTitle:"Spremi metapodatke",working:"Spremanje metapodataka...",errorSaving:"Do\u0161lo je do pogre\u0161ke, va\u0161i metapodaci nisu spremljeni.",saveDialog:{pushCaption:"Primijeni promjene na stavku"}},saveAndClose:{caption:"Spremi i zatvori"},saveDraft:{caption:"Spremi lokalnu kopiju",dialogTitle:"Spremi lokalnu kopiju"},validate:{caption:"Provjeri valjanost",dialogTitle:"Provjera valjanosti",docIsValid:"Va\u0161 je dokument va\u017ee\u0107i."},del:{caption:"Izbri\u0161i",
dialogTitle:"Izbri\u0161i metapodatke",prompt:"Jeste li sigurni da \u017eelite izbrisati ove metapodatke?",working:"Brisanje metapodataka...",errorDeleting:"Do\u0161lo je do pogre\u0161ke, va\u0161i metapodaci nisu izbrisani."},transform:{caption:"Pretvori",dialogTitle:"Pretvori u",prompt:"",working:"Pretvorba...",errorTransforming:"Do\u0161lo je do pogre\u0161ke tijekom pretvorbe dokumenta."},errorDialog:{dialogTitle:"Do\u0161lo je do pogre\u0161ke"}},arcgis:{portal:{metadataButton:{caption:"Metapodaci"}}},
calendar:{button:"Kalendar...",title:"Kalendar"},geoExtent:{button:"Postavi geografski obuhvat...",title:"Geografski obuhvat",navigate:"Navigiraj",draw:"Nacrtaj pravokutnik",drawHint:"Pritisnite prema dolje za po\u010detak i pustite za zavr\u0161etak."},hints:{date:"(gggg ili gggg-mm ili gggg-mm-dd)",dateTime:"(gggg-mm-ddThh:mm:ss.sss[+-]hh:mm)",dateOrDateTime:"(gggg ili gggg-mm ili gggg-mm-dd ili gggg-mm-ddThh:mm:ss.sss[+-]hh:mm)",delimitedTextArea:"(razdvojite zarezom ili novim retkom)",fgdcDate:"(gggg ili gggg-mm ili gggg-mm-dd)",
fgdcTime:"(hh:mm:ss.sss[+-]hh:mm)",integer:"(unesite cijeli broj)",latitude:"(decimalni stupnjevi)",longitude:"(decimalni stupnjevi)",number:"(unesite broj)",numberGreaterThanZero:"(unesite broj \x3e 0)"},isoTopicCategoryCode:{caption:"Kategorija teme",boundaries:"Administrativne i politi\u010dke granice",farming:"Poljoprivreda i uzgoj",climatologyMeteorologyAtmosphere:"Atmosfera i klima",biota:"Biologija i ekologija",economy:"Poslovanje i ekonomija",planningCadastre:"Katastar",society:"Kultura, dru\u0161tvo i demografija",
elevation:"Visina terena i nastali proizvodi",environment:"Okoli\u0161 i o\u010duvanje",structure:"Objekti i strukture",geoscientificInformation:"Geologija i geofizika",health:"Ljudsko zdravlje i bolest",imageryBaseMapsEarthCover:"Snimke i kartografske podloge",inlandWaters:"Resursi kopnenih voda",location:"Lokacije i geodetske mre\u017ee",intelligenceMilitary:"Vojska",oceans:"Oceani i estuariji",transportation:"Prijevozne mre\u017ee",utilitiesCommunication:"Uslu\u017eni programi i komunikacija"},
multiplicity:{moveElementDown:"Pomakni odjeljak prema dolje",moveElementUp:"Premjesti odjeljak prema gore",removeElement:"Ukloni odjeljak",repeatElement:"Ponovi odjeljak"},optionalNode:{switchTip:"Uklju\u010di ili izostavi ovaj odjeljak."},serviceTypes:{featureService:"Usluga geoobjekata",mapService:"Usluga karte",imageService:"Usluga slike",wms:"WMS",wfs:"WFS",wcs:"WCS"},validation:{pattern:"{label} - {message}",patternWithHint:"{label} - {message} {hint}",ok:"U redu",empty:"Potrebna je vrijednost.",
date:"Vrijednost mora biti datum.",integer:"Vrijednost mora biti cijeli broj.",number:"Vrijednost mora biti broj.",other:"Vrijednost nije va\u017ee\u0107a."},validationPane:{clearMessages:"O\u010disti poruke",prompt:"(kliknite na svaku poruku u nastavku i navedite potrebne informacije u odre\u0111enom polju)"}});