export default `
	type Media implements Resource & TrackModifications {
		id: ID!
		user: User!
		created: Date!

		lastModified: Int
		lastModifier: User

		name: String!
		description: String!

		bytes: Int!
		extension: String!
		path: String!
		url: String!
		size: Vec2
	}
`;
