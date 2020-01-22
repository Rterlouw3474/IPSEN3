export class RDWFuel {

  kenteken : string;
  brandstof_volgnummer : number;
  brandstof_omschrijving : string;
  brandstofverbruik_buiten : number;
  brandstofverbruik_gecombineerd : number;
  brandstofverbruik_stad : number;
  co2_uitstoot_gecombineerd : number;
  geluidsniveau_rijdend : number;
  geluidsniveau_stationair : number;
  emissiecode_omschrijving : number;
  milieuklasse_eg_goedkeuring_licht : string;
  nettomaximumvermogen : number;
  toerental_geluidsniveau : number;

  constructor(kenteken: string, brandstof_volgnummer: number, brandstof_omschrijving: string, brandstofverbruik_buiten: number, brandstofverbruik_gecombineerd: number, brandstofverbruik_stad: number, co2_uitstoot_gecombineerd: number, geluidsniveau_rijdend: number, geluidsniveau_stationair: number, emissiecode_omschrijving: number, milieuklasse_eg_goedkeuring_licht: string, nettomaximumvermogen: number, toerental_geluidsniveau: number) {
    this.kenteken = kenteken;
    this.brandstof_volgnummer = brandstof_volgnummer;
    this.brandstof_omschrijving = brandstof_omschrijving;
    this.brandstofverbruik_buiten = brandstofverbruik_buiten;
    this.brandstofverbruik_gecombineerd = brandstofverbruik_gecombineerd;
    this.brandstofverbruik_stad = brandstofverbruik_stad;
    this.co2_uitstoot_gecombineerd = co2_uitstoot_gecombineerd;
    this.geluidsniveau_rijdend = geluidsniveau_rijdend;
    this.geluidsniveau_stationair = geluidsniveau_stationair;
    this.emissiecode_omschrijving = emissiecode_omschrijving;
    this.milieuklasse_eg_goedkeuring_licht = milieuklasse_eg_goedkeuring_licht;
    this.nettomaximumvermogen = nettomaximumvermogen;
    this.toerental_geluidsniveau = toerental_geluidsniveau;
  }
}
