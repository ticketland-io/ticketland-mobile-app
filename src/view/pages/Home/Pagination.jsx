import {Text} from '@rneui/base';
import {Button} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import {DOTS, usePagination} from '../../../helpers/pagination'
import AntIcon from "react-native-vector-icons/AntDesign";

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });


  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const onCurrent = page => () => {
    onPageChange(page);
  };

  const renderRange = () => (
    <>
      {paginationRange.map(pageNumber => (pageNumber === DOTS
        ? (
          <Button type={'outline'} disabled>
            <Text>&#8230;</Text>
          </Button>
        )
        : (
          <Button key={pageNumber} type={'outline'} onPress={onCurrent(pageNumber)}>
            <Text h4={pageNumber === currentPage ? true : false}>
              {pageNumber}
            </Text>
          </Button>
        )
      ))}
    </>
  )

  // If there are less than 2 times in pagination range we shall not render the component
  // if (currentPage === 0 || paginationRange.length < 2) {
  //   return null;
  // }

  return currentPage === 0 || paginationRange.length < 2
    ? null
    : (
      <View style={{flexDirection: 'row'}}>
        <View>
          <Button
            type={'outline'}
            onPress={onPrevious}
          >
            <AntIcon
              name="left"
              size={15}
            />
          </Button>
        </View>
        {renderRange()}
        <View>
          <Button type={'outline'} onPress={onNext}>
            <AntIcon
              name="right"
              size={15}
            />
          </Button>
        </View>
      </View>
    )
};

export default Pagination;
