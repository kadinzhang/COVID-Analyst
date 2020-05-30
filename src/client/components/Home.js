import React, { Component } from 'react';
import '../styles/Home.css';
import logo from '../images/Logo.png';
import searchIcon from '../images/search-icon.png';
import bottomcircle from '../images/bottomcircle.png';
import topcircle from '../images/topcircle.png';
import leftcovid from '../images/leftcovid.png';
import rightcovid from '../images/rightcovid.png';
import topsvg from '../images/topsvg.png';
import rightsvg from '../images/rightsvg.png';
import apm from '../images/apm.png';
import gcp from '../images/gcp.png';
import { Link } from 'react-router-dom';
import Script from 'react-load-script';

export default class Home extends Component {
	constructor(props) {
		super(props);

		// Declare State
		this.state = {
			city: 'Wake County, NC, USA',
			query: 'Wake County, NC, USA',
		};
	}

	handleScriptLoad = () => {
		// Declare Options For Autocomplete
		const options = {
			types: ['(regions)'],
		}; // To disable any eslint 'google not defined' errors

		// Initialize Google Autocomplete
		/*global google*/ this.autocomplete = new google.maps.places.Autocomplete(
			document.getElementById('autocomplete'),
			options
		);

		// Avoid paying for data that you don't need by restricting the set of
		// place fields that are returned to just the address components and formatted
		// address.
		this.autocomplete.setFields(['address_components', 'formatted_address']);

		// Fire Event when a suggested name is selected
		this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
	};

	handlePlaceSelect = () => {
		// Extract City From Address Object
		const addressObject = this.autocomplete.getPlace();
		const address = addressObject.address_components;

		// Check if address is valid
		if (address) {
			// Set State
			this.setState({
				city: address[0].long_name + ', ' + address[2].short_name + ', ' + address[3].short_name,
				query: addressObject.formatted_address,
			});
		}
	};

	render() {
		const { username } = this.state;
		return (
			<div>
				<Script
					url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBMffDs4ArTuXCQCp0Wcm-47MU-ZWnA-uQ&libraries=places"
					onLoad={this.handleScriptLoad}
				/>
				<div className="homebackground"></div>

				<img src={logo} className="logo" />
				<img src={topsvg} className="topsvg" />
				<img src={rightsvg} className="rightsvg" />
				<p className="apmp">Powered by</p>
				<img src={apm} className="apm" />
				<img src={gcp} className="gcp" />

				{/* {/* <img src={leftcovid} className="leftcovid" /> */}
				{/* {/* <img src={rightcovid} className="rightcovid" /> */}
				{/* <img src={topcircle} className="topcircle" /> */}
				{/* {/* <img src={bottomcircle} className="bottomcircle" /> */}
				{/* <p className="subhead">Powerful, targeted COVID-19 analytics for your region</p> */}
				<div className="dark">
					<p className="searchDescription">
						COVID Analyst uses machine learning and statistical analysis with a combination of reliable data
						sources and research publications to give you an address-level risk heatmap of COVID-19 in your
						area, and curates relevant regional news from credible outlets. If you have any questions, ask
						our chat AI!
					</p>

					<input
						id="autocomplete"
						className="searchBar"
						placeholder="Berkeley, California, USA"
						value={this.state.query}
					></input>
					<div className="searchButton">
						<Link
							to={{
								pathname: `/info/${this.state.city}`,
								state: {
									location: this.state.city,
								},
							}}
						>
							<img src={searchIcon} className="img" />
						</Link>
					</div>
				</div>
			</div>
		);
	}
}
