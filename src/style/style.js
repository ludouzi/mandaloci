import {StyleSheet} from 'react-native';

const globalStyle = {
  marginLeft: '4%',
  marginRight: '4%',
  marginTop: '3%',
  borderRadius: 14,
};

export const mainColour = '#1A2138';
export const secColour = '#222B45';

export const style = StyleSheet.create({
  container: {...globalStyle},
  tutorialContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  tabContainer: {
    flex: 1,
    backgroundColor: mainColour,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: mainColour,
  },
  reviseCard: {
    width: '50%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviseText: {
    fontSize: 20,
  },
  cardTotal: {
    fontWeight: 'bold',
  },
  reviseContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mainColour,
  },
  emptyContainer: {
    alignItems: 'center',
    backgroundColor: mainColour,
    marginTop: '50%',
  },
  emptyText: {
    fontSize: 30,
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: mainColour,
  },
  tutorialVew: {
    ...globalStyle,
    justifyContent: 'center',
  },
  pageContainer: {marginTop: 30},
  pageView: {margin: 10},
  pageText: {flexDirection: 'row'},
  textRow: {paddingRight: 10},
  firstCard: {
    alignItems: 'center',
    width: '23%',
    margin: 2,
  },
  editCard: {
    flex: 1,
    margin: 2,
  },
  editingCard: {
    flex: 1,
    margin: 2,
    height: 150,
  },
  pinyinCard: {
    width: '25%',
    margin: 2,
  },
  saveButton: {
    width: 150,
    alignSelf: 'center',
    marginTop: 25,
  },
  lessonTitle: {
    color: 'white',
    alignSelf: 'flex-end',
    fontSize: 40,
  },
  card: {
    margin: 5,
    borderRadius: 14,
    backgroundColor: secColour,
  },
  cardDisabled: {
    margin: 5,
    borderRadius: 14,
    backgroundColor: 'grey',
  },
  lessonView: {
    flex: 1,
    borderRadius: 14,
  },
  buttonsContainer: {
    width: '100%',
    marginTop: '20%',
  },
  lessonButton: {
    width: '100%',
    height: 100,
  },
  pageTitle: {fontSize: 60, alignItems: 'center'},
  title: {fontFamily: 'Segoe-Script', fontSize: 30},
  subtitle: {fontSize: 15},
  tab: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: secColour,
  },
  titleView: {
    alignItems: 'center',
  },
});
