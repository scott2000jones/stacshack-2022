require 'sinatra'
require 'sequel'

DB = Sequel.sqlite('database.db')
# DB.run "CREATE TABLE users (name VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY, password VARCHAR(255) NOT NULL)"
# DB.run "CREATE TABLE teams (team_name VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY)"
# DB.run "CREATE TABLE team_user_lookup (team_name VARCHAR(255) NOT NULL UNIQUE, user_name VARCHAR(255) NOT NULL UNIQUE, FOREIGN KEY (team_name) REFERENCES teams (team_name), FOREIGN KEY (user_name) REFERENCES users (name))"
# DB.run "CREATE TABLE dms (team_name VARCHAR(255) NOT NULL, sent_by VARCHAR(255) NOT NULL, content VARCHAR(255), timestamp INTEGER, FOREIGN KEY (team_name) REFERENCES teams (team_name), FOREIGN KEY (sent_by) REFERENCES users (name))"

puts DB.schema(:users)
puts DB.schema(:teams)
puts DB.schema(:team_user_lookup)
get '/' do
    DB[:users].all.to_s
end

post "/register" do
    @name = params["name"]
    @password = params["password"]
    DB.run "INSERT INTO users (name, password) VALUES (\"" + @name + "\", \"" + @password + "\")"
    "Ok!\n"
end

get "/list_users" do
    DB[:users].all.to_s
    "Ok!\n"
end

get "/drop_all_users" do
    DB.run "DELETE FROM users"
    "Ok!\n"
end

def check_in_db(target_name, target_pw)
    DB[:users].all.each do |item|
        if item[:name] == target_name && item[:password] == target_pw then
            return true
        end
    end
    return false
end

post "/login" do
    @name = params["name"]
    @password = params["password"]
    check_in_db(@name, @password) ? "TRUE" : "FALSE"
end

post "/create_team" do
    @team_name = params["team_name"]
    DB.run "INSERT INTO teams (team_name) VALUES (\"" + @team_name + "\")"
    "Ok!\n"
end

post "/add_user_to_team" do
    @team_name = params["team_name"]
    @user_name = params["user_name"]
    "NOT IMPLEMENTED YET\n"
end

get "/list_teams" do
    DB[:teams].all.to_s
end

get "/delete_all_teams" do
    DB.run "DELETE FROM teams"
    "Ok!\n"
end

post "/send_dm" do
    @team_name = params["team_name"]
    @sent_by = params["sent_by"]
    @content = params["content"]
    DB.run "INSERT INTO dms (team_name, sent_by, content, timestamp) VALUES (\"" + @team_name + "\", \"" + @sent_by + "\", \"" + @content + "\", " + Time.now.to_i.to_s +  ")"
    "Ok!\n"
end

get "/list_dms" do
    DB[:dms].all.to_s
end
