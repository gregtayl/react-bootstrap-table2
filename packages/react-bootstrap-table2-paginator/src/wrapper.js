/* eslint react/prop-types: 0 */
/* eslint react/prefer-stateless-function: 0 */
/* eslint arrow-body-style: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const wrapperFactory = (baseElement, Const) =>
  class PaginationWrapper extends Component {
    static propTypes = {
      store: PropTypes.object.isRequired,
      options: PropTypes.object
    }

    static defaultProps = {
      options: {
        paginationSize: Const.PAGINATION_SIZE,
        pageStartIndex: Const.PAGE_START_INDEX,
        withFirstAndLast: Const.With_FIRST_AND_LAST,
        alwaysShowAllBtns: Const.SHOW_ALL_PAGE_BTNS,
        firstPageText: Const.FIRST_PAGE_TEXT,
        prePageText: Const.PRE_PAGE_TEXT,
        nextPageText: Const.NEXT_PAGE_TEXT,
        lastPageText: Const.LAST_PAGE_TEXT,
        sizePerPageList: Const.SIZE_PER_PAGE_LIST
      }
    }

    constructor(props) {
      super(props);
      const options = props.options || {};
      const currPage = options.pageStartIndex || Const.PAGE_START_INDEX;
      this.handleChangePage = this.handleChangePage.bind(this);
      this.handleChangeSizePerPage = this.handleChangeSizePerPage.bind(this);
      this.state = {
        currPage,
        currSizePerPage: Const.SIZE_PER_PAGE_LIST[0]
      };
    }

    handleChangePage(currPage) {
      this.setState(() => {
        return {
          currPage
        };
      });
    }

    handleChangeSizePerPage(currSizePerPage, currPage) {
      this.setState(() => {
        return {
          currPage,
          currSizePerPage
        };
      });
    }

    render() {
      const { pagination: { Pagination }, options, store } = this.props;
      const { currPage, currSizePerPage } = this.state;
      const base = baseElement({
        ...this.props,
        data: store.getByCurrPage(currPage, currSizePerPage)
      });

      return (
        <div className="react-bootstrap-table-container">
          { base }
          <Pagination
            dataSize={ this.props.store.getDataSize() }
            currPage={ currPage }
            currSizePerPage={ currSizePerPage }
            onPageChange={ this.handleChangePage }
            onSizePerPageChange={ this.handleChangeSizePerPage }
            sizePerPageList={ options.sizePerPageList || Const.SIZE_PER_PAGE_LIST }
            paginationSize={ options.paginationSize || Const.PAGINATION_SIZE }
            pageStartIndex={ options.pageStartIndex || Const.PAGE_START_INDEX }
            withFirstAndLast={ options.withFirstAndLast || Const.With_FIRST_AND_LAST }
            alwaysShowAllBtns={ options.alwaysShowAllBtns || Const.SHOW_ALL_PAGE_BTNS }
            firstPageText={ options.firstPageText || Const.FIRST_PAGE_TEXT }
            prePageText={ options.prePageText || Const.PRE_PAGE_TEXT }
            nextPageText={ options.nextPageText || Const.NEXT_PAGE_TEXT }
            lastPageText={ options.lastPageText || Const.LAST_PAGE_TEXT }
          />
        </div>
      );
    }
  };

export default wrapperFactory;
