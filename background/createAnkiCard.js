const axios = require('axios').default;

export async function createAnkiCard(myMove, engineMove) {
  createCardAPI(myMove, engineMove);
}

async function createCardAPI(myMove, engineMove) {
  console.log('wow');
  try {
    const response = await axios.post('http://127.0.0.1:8765', {
      action: 'guiAddCards',
      version: 6,
      params: {
        note: {
          deckName: 'My German',
          modelName: 'Chess Question',
          fields: {
            front_position: myMove,
            solution_position: engineMove,
          },
          tags: [
            'chess', 'chess-generated',
          ],
        },
      },
    });

    if (response.data.error) throw response.error;

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

export default createAnkiCard;
