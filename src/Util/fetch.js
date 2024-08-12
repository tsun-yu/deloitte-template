const fetchData = async () => {
  try {
    const response = await fetch(`http://twtpedv200/fahh/Users/getJWT`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });

    if (!response.ok) {
      throw new Error('something went wrong');
    }

    console.log('response:', response);

    // const data = await response.text();
    // const parser = new DOMParser();
    // const xmlDoc = parser.parseFromString(data, 'text/xml');

    // const jsonString = xmlDoc.getElementsByTagName('string')[0].childNodes[0]?.nodeValue;

    // if (!jsonString) return '';
    // if (jsonString.includes(',qrcode_') || jsonString.includes('xpired')) return jsonString;

    // return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error(error);
  }
};

export { fetchData };
