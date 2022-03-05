require 'sinatra'
require 'sequel'
require 'sinatra/cross_origin'
require 'json'

configure do
  enable :cross_origin
end

DB = Sequel.sqlite('database.db')
# DB.run "CREATE TABLE users (name VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY, password VARCHAR(255) NOT NULL)"
# DB.run "CREATE TABLE teams (team_name VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY)"
# DB.run "CREATE TABLE team_user_lookup (team_name VARCHAR(255) NOT NULL UNIQUE, user_name VARCHAR(255) NOT NULL UNIQUE, FOREIGN KEY (team_name) REFERENCES teams (team_name), FOREIGN KEY (user_name) REFERENCES users (name))"
# DB.run "CREATE TABLE dms (team_name VARCHAR(255) NOT NULL, sent_by VARCHAR(255) NOT NULL, content VARCHAR(255), timestamp INTEGER, FOREIGN KEY (team_name) REFERENCES teams (team_name), FOREIGN KEY (sent_by) REFERENCES users (name))"

puts DB.schema(:users)
puts DB.schema(:teams)
puts DB.schema(:team_user_lookup)
get '/' do
    DB[:users].all.to_json
end

get "/register/*.*" do |name,password|
    DB.run "INSERT INTO users (name, password) VALUES (\"" + name + "\", \"" + password + "\")"
    "Ok!\n"
end

get "/list_users" do
    DB[:users].all.to_json
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

get "/login/*.*" do |name,password|
    check_in_db(name, password) ? "TRUE" : "FALSE"
end

get "/create_team/*" do |team_name|
    DB.run "INSERT INTO teams (team_name) VALUES (\"" + team_name + "\")"
    "Ok!\n"
end

get "/add_user_to_team/*.*" do |team_name,user_name|
    DB.run "INSERT INTO team_user_lookup (team_name, user_name) VALUES (\"" + team_name + "\", \"" + user_name + "\")"
    "Ok!\n"
end

get "/list_teams" do
    DB[:teams].all.to_json
end

get "/team_user_lookup" do
    DB[:team_user_lookup].all.to_json
end

get "/delete_all_teams" do
    DB.run "DELETE FROM teams"
    "Ok!\n"
end

get "/send_dm/*.*.*" do |team_name,sent_by,content|
    content = content.tr("_"," ")
    DB.run "INSERT INTO dms (team_name, sent_by, content, timestamp) VALUES (\"" + team_name + "\", \"" + sent_by + "\", \"" + content + "\", " + Time.now.to_i.to_s +  ")"
    "Ok!\n"
end

get "/list_all_dms" do
    DB[:dms].all.to_json
end

get "/list_dms/*" do |team_name|
    res = Array.new
    DB[:dms].all.each do |item|
        puts item
        if item[:team_name] == team_name then
            res.append(item)
        end
    end
    res.to_json
end
