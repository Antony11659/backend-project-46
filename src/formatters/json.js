const buildJsonFormat = (collection) => {
  const buildJson = (root, coll) => coll.reduce((acc, el) => {
    // if el has children go right branch
    const newRightBranch = [...acc.rightBranch, buildJson(el.name, el.children)];
    const newLeftBranch = [...acc.leftBranch, el];
    const rightBranch = el.children.length > 0 ? newRightBranch : [...acc.rightBranch];
    // if el doesn't have children go left branch
    const leftBranch = el.children.length === 0 ? newLeftBranch : [...acc.leftBranch];

    return { ...acc, rightBranch, leftBranch };
  }, { name: root, rightBranch: [], leftBranch: [] });
  return JSON.stringify(buildJson('root', collection));
};

export default buildJsonFormat;

// the idea is to create this json:

// const json = {
//   "name": "root",                                    ROOT
//   "rightBranch": [                                /       \
//       {                                          /         \
//         'name':'common',                   branch           branch has children
//          'rightBranch': [                  doesn't
//                                            have children
//          ],
//           'leftBranch': [

//           ]

//       },
//   ],
//   "leftBranch": [
//       {'name': 'group2'}
//   ]
// };
