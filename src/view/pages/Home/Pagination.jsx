import {Button, Text} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import AntIcon from "react-native-vector-icons/AntDesign";
import {DOTS, usePagination} from '../../../helpers/pagination'
import useStyles from './styles'

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    currentPage,
    pageSize,
  } = props;
  const classes = useStyles()

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    pageSize
  });

  const onNext = () => {
    if (currentPage < totalCount / pageSize) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const onCurrent = page => () => {
    onPageChange(page);
  };

  const renderRange = () => (
    <View style={classes.paginationRangeContainer}>
      {paginationRange.map(pageNumber => (pageNumber === DOTS
        ? (
          <Button
            type={'outline'}
            buttonStyle={classes.paginationButton}
            disabled
          >
            <Text>
              &#8230;
            </Text>
          </Button>
        )
        : (
          <Button
            key={pageNumber}
            type={'outline'}
            buttonStyle={[
              classes.paginationButton,
              {
                backgroundColor: `${pageNumber === currentPage
                  ? classes.paginationButton.selected.backgroundColor
                  : classes.paginationButton.unSelected.backgroundColor
                  }`
              }
            ]}
            onPress={onCurrent(pageNumber)}
          >
            <Text
              pagination
              style={{
                color: `${pageNumber === currentPage
                    ? classes.paginationButtonText.selected.color
                    : classes.paginationButtonText.unSelected.color
                  }`
              }}
            >
              {pageNumber}
            </Text>
          </Button>
        )
      ))}
    </View>
  )

  return paginationRange.length > 1 && (
    <View style={classes.paginationContainer}>
      <View style={classes.paginationLeftArrow}>
        <Button
          type={'outline'}
          onPress={onPrevious}
          buttonStyle={classes.paginationButton}
        >
          <AntIcon
            name="left"
            size={10}
          />
        </Button>
      </View>
      {renderRange()}
      <View style={classes.paginationRightArrow}>
        <Button
          type={'outline'}
          onPress={onNext}
          buttonStyle={classes.paginationButton}
        >
          <AntIcon
            name="right"
            size={10}
          />
        </Button>
      </View>
    </View>
  )
};

export default Pagination;
