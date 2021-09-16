import {makeStyles} from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    maxWidth: '100%'
  },
  media: {
    heght: 0,
    paddingTop: '56.25%', // 16:9
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'felx-end',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  }
}));