export const getMonthName = (monthNumber) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return months[monthNumber - 1] || 'Invalid month';
};

export const musicsList = [
  {
    id: 'BS01',
    name: 'bar bar ye din aaye',
    url: '/audios/bar bar ye din aaye.mp3',
    duration: '0:30',
    cover: '/covers/besharam.jpg',
  },
  {
    id: 'BS02',
    name: 'happy birthday to you ji',
    url: '/audios/happy birthday to you ji.mp3',
    duration: '0:30',
    cover: '/covers/kesariya.jpg',
  },
  {
    id: 'BS03',
    name: 'lalan tujhe birthday mubarak ho',
    url: '/audios/lalan tujhe birthday mubarak ho.mp3',
    duration: '0:30',
    cover: '/covers/heeriye.jpg',
  },
  {
    id: 'BS04',
    name: 'sal bhar me sbse jyada',
    url: '/audios/sal bhar me sbse jyada.mp3',
    duration: '0:30',
    cover: '/covers/heeriye.jpg',
  },
  {
    id: 'BS00',
    name: 'No Music ?',
    url: '/audios/',
    duration: '',
    cover: '/covers/heeriye.jpg',
  },
];
