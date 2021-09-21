namespace rtchatty.Database
{
	public interface IChattyDatabaseSettings
	{
		string UsersCollectionName { get; set; }
		string ConnectionString { get; set; }
		string DatabaseName { get; set; }
	}
}