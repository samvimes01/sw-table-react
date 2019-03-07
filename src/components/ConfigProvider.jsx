import React, { useState, useEffect } from 'react';


const { Consumer, Provider } = React.createContext();

export const ConfigProvider = () => {

  return (
    <Provider value={this.state}>
      {props.children}
    </Provider>
  );
}

export const withApi = (OriginalComponent) => {
  return wrapperProps => (
    <Consumer>
      {contextValue => (
        <OriginalComponent {...wrapperProps} shoppingCart={contextValue} />
      )}
    </Consumer>
  );
};
