export default `
	type Page implements Resource & TrackModifications {
		id: ID!
		user: User
		created: Date!

		lastModified: Int
		lastModifier: User

		name: String!
		description: String!
		layout: Layout
	}
`;
