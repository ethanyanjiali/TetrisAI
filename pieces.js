var PIECES = new Array();

/* 'I' piece:
  Orientations:
  X
  X       XXXXX
  X
  X
  */
PIECES[0] = [
    {
      orientation: [1, 1, 1, 1],
      width: 1,
      height: 4
    },
    {
      orientation: [[1,1,1,1]],
      width: 4,
      height: 1
    }
];

/**
 * 'T' piece
 * Orientations:
 *
 *  O     O      O    OOO
 * OOO    OO    OO     O
 *        O      O
 */
PIECES[1] = [
    {
      orientation: [
          [1,0],
          [1,1],
          [1,0]
      ],
      width: 2,
      height: 3,
    }, 
    {
      orientation: [
          [0,1,0],
          [1,1,1]
      ],
      width: 3,
      height: 2,
    },
    {
      orientation: [
          [0,1],
          [1,1],
          [0,1]
      ],
      width: 2,
      height: 3,
    },
    {
      orientation: [
          [1,1,1],
          [0,1,0]
      ],
      width: 3,
      height: 2,
    },
];

/**
 * 'O' piece
 * Orientations:
 *
 * OO
 * OO
 */
PIECES[2] = [
    {
      orientation: [
          [1,1],
          [1,1]
      ],
      width: 2,
      height: 2,
    },
];

/**
 * 'J' piece
 * Orientations:
 *
 * O      OO    OOO    O
 * OOO    O       O    O
 *        O           OO
 */
PIECES[3] = [
    {
      orientation: [
          [1,0,0],
          [1,1,1]
      ],
      width: 3,
      height: 2,
    },
    {
      orientation: [
          [0,1],
          [0,1],
          [1,1]
      ],
      width: 2,
      height: 3,
    },
    {
      orientation: [
          [1,1,1],
          [0,0,1],
      ],
      width: 3,
      height: 2,
    },
    {
      orientation: [
          [1,1],
          [1,0],
          [1,0]
      ],
      width: 2,
      height: 3,
    },
];

/**
 * 'L' piece
 * Orientations:
 *
 *   O    OO    OOO    O
 * OOO     O    O      O
 *         O           OO
 */
PIECES[4] = [
    {
      orientation: [
          [1,1,1],
          [1,0,0],
      ],
      width: 3,
      height: 2,
    },
    {
      orientation: [
          [1,0],
          [1,0],
          [1,1]
      ],
      width: 2,
      height: 3,
    },
    {
      orientation: [
          [0,0,1],
          [1,1,1]
      ],
      width: 3,
      height: 2,
    },
    {
      orientation: [
          [1,1],
          [0,1],
          [0,1]
      ],
      width: 2,
      height: 3,
    },
    
];


/**
 * 'S' piece
 * Orientations:
 *
 *  OO    O
 * OO     OO
 *         O
 */
PIECES[5] = [
    {
      orientation: [
          [1,0],
          [1,1],
          [0,1]
      ],
      width: 2,
      height: 3,
    },
    {
      orientation: [
          [0,1,1],
          [1,1,0]
      ],
      width: 3,
      height: 2,
    },
];

/**
 * 'Z' piece
 * Orientations:
 *
 * OO      O
 *  OO    OO
 *        O
 */
PIECES[6] = [
    {
      orientation: [
          [0,1],
          [1,1],
          [1,0]
      ],
      width: 2,
      height: 3,
    },
    {
      orientation: [
          [1,1,0],
          [0,1,1]
      ],
      width: 3,
      height: 2,
    },
];
