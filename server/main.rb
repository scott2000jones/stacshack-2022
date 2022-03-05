require 'sinatra'
require 'sequel'

DB = Sequel.sqlite('database.db')
# DB.run "CREATE TABLE users (name VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)"
puts DB.schema(:users)
get '/' do
    # DB.run "INSERT INTO users (name, password) VALUES (\"HELLO\",\"TEST\")"
    DB[:users].all.to_s
end

post "/register" do
    @name = params["name"]
    @password = params["password"]
    puts @name 
    puts @password
    puts "INSERT INTO users (name, password) VALUES (\"" + @name + "\", \"" + @password + "\")"
    DB.run "INSERT INTO users (name, password) VALUES (\"" + @name + "\", \"" + @password + "\")"
    "Ok!"
end