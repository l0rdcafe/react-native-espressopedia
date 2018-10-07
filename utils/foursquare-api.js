const CLIENT_ID = "32IXSTBK1V3NFIH3NFJ5LZHYWKKSNA131CZR0RFCE2OTRERJ";
const CLIENT_SECRET = "0SVNBULCMHEUOY3ZXSGPVJ3XDQN5EYNZRXOXHNIU2AOVO10Q";

const getCoffeeShops = async (lat, lon) => {
  try {
    let data = await fetch(
      `https://api.foursquare.com/v2/venues/explore?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&ll=${lat},${lon}&radius=4000&section=coffee&v=20180707&limit=20`
    );
    data = await data.json();
    data = data.response.groups[0].items;
    return data;
  } catch (e) {
    console.error(e);
  }
};

export default getCoffeeShops;
