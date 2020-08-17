import * as React from 'react';

export default class DoubleClickable<P, S> extends React.PureComponent<P, S> {
  private _lastClick: number = 0;
  private _timeout: any = undefined;

	constructor(props: P) {
		super(props);

		this.handleClickTest = this.handleClickTest.bind(this);
	}

	handleAnyClick(_: React.SyntheticEvent) {}
	handleFirstClick(_: React.SyntheticEvent) {}
	handleSingleClick(_: React.SyntheticEvent) {}
	handleDoubleClick(_: React.SyntheticEvent) {}

	protected handleClickTest(e: React.SyntheticEvent) {
    const timeout = 250;

    e.persist();
    e.preventDefault();

    this.handleAnyClick(e);

    if (Date.now() - this._lastClick < timeout) {
    	this._lastClick = 0;
    	clearTimeout(this._timeout);
    	this.handleDoubleClick(e);
    }
    else {
	    this._lastClick = Date.now();
	    this.handleFirstClick(e);
	    this._timeout = setTimeout(() => this.handleSingleClick(e), timeout)
	  }
	}
}
