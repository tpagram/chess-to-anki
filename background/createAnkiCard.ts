import axios from 'axios';
import ChessProblem from '../types/ChessProblem';

type AnkiClientResponse = {
  result: string
  error: string
};

export async function createAnkiCard(chessProblem: ChessProblem) {
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
            front_position: chessProblem.problemFen,
            question: chessProblem.problemText,
            solution_position: chessProblem.solutionFen,
            solution: chessProblem.solutionText,
            'black_to_play?': chessProblem.blackTurn ? 'y' : '',
            lichess_link: chessProblem.lichessLink,
            chess_com_link: chessProblem.chessComLink,
          },
          tags: [
            'chess', 'chess-generated',
          ],
        },
      },
    });

    const ankiResponse = response.data as AnkiClientResponse;
    if (ankiResponse.error) throw new Error(ankiResponse.error);

    console.log(ankiResponse);
  } catch (error) {
    console.error(error);
  }
}

export default createAnkiCard;
