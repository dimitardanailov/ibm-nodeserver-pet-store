import { mongoose } from "../database/config";
import { Document, Schema } from "mongoose";
import { IPet } from '../interfaces/IPet';

interface IPetModel extends IPet, Document {
  
}

const PetSchema: Schema = new Schema({
	'name': String,
	'age': Number,
	'createdAt': Date,
	'updatedAt': Date
});

/**
 * Documents have a toObject method which converts the 
 * mongoose document into a plain javascript object. 
 * This method accepts a few options. Instead of applying 
 * these options on a per-document basis we may declare the options here 
 * and have it applied to all of this schemas documents by default.
 * 
 * To have all virtuals show up in your console.log output, set the 
 * toObject option to { getters: true }
 */
PetSchema.set('toObject', { getters: true });


/**
 * Exactly the same as the toObject option but only applies 
 * when the documents toJSON method is called.
 */
PetSchema.set('toJSON', { getters: true, virtuals: false });

/**
 * A pre-save hook to fill the createdAt and updatedAt.
 */
PetSchema.pre('save', next => {
	const now = new Date();
	if (!this.createdAt) {
		this.createdAt = now;
		this.updatedAt = now;
	}
	next();
});

export class Pet extends mongoose.model<IPetModel>('Pet', PetSchema) {
}
