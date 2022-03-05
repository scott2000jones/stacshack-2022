require 'sinatra'
require 'sequel'

DB = Sequel.sqlite('database.db')
# DB.run "CREATE TABLE users (name VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)"

puts DB.schema(:users)
get '/' do
    DB[:users].all.to_s
end

post "/register" do
    @name = params["name"]
    @password = params["password"]
    DB.run "INSERT INTO users (name, password) VALUES (\"" + @name + "\", \"" + @password + "\")"
    "Ok!"
end

get "/drop_all_users" do
    DB.run "DELETE FROM users"
    "Ok!"
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