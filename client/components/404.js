import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'

const NotFound = (props) => {
  return (
    <div className="grid grid-cols-5 bg-gray-900 text-white h-screen font-mono text-center">
      <div className="grid col-start-3 col-end-3 grid-rows-2 m-4">
        <div className="p-4">
          <h1 className="p-4">404</h1>
          <p className="text-gray-500">page not found</p>
          <p className="text-gray-500 p-4">¯\_(ツ)_/¯</p>
          <button
            className="p-2 border-solid border-2 border-gray-500"
            type="button"
            onClick={props.goRoot}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

NotFound.propTypes = {
  goRoot: PropTypes.func
}

NotFound.defaultProps = {
  goRoot: () => {}
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      goRoot: () => push('/')
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(NotFound)
