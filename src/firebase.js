import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyD7F88PH5PdbBTMnskrAJPntbO2OvkBXzo',
	authDomain: 'productsproject-6e817.firebaseapp.com',
	projectId: 'productsproject-6e817',
	storageBucket: 'productsproject-6e817.appspot.com',
	messagingSenderId: '893909376545',
	appId: '1:893909376545:web:d3d6a48185dfe76db98d60',
	databaseURL:
		'https://productsproject-6e817-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
