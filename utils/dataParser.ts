export class DataParser {
  private static expOpt = ["exp", "expiration", "expires"];
  private static mfgOpt = ["mfg", "manf", "manufacturer"];
  private static serialOpt = [
    "serial",
    "serial #",
    "serial num",
    "serial number",
  ];

  public static rabiesMetaParser = (metaString: string) => {
    let result = {
      expiration: "",
      manufacturer: "",
      serial: "",
    };

    metaString
      .split("\r\n")
      .map((x) => x.split(":"))
      .map((x) => x.map((y) => y.trim()))
      .reduce((map, obj) => {
        if (this.expOpt.indexOf(obj[0].toLowerCase()) > -1) {
          map.expiration = obj[1].trim();
        }
        if (this.mfgOpt.indexOf(obj[0].toLowerCase()) > -1) {
          map.manufacturer = obj[1].trim();
        }
        if (this.serialOpt.indexOf(obj[0].toLowerCase()) > -1) {
          map.serial = obj[1].trim();
        }
        return map;
      }, result);

    return result;
  };
}
