use sakila
;

#1a) Display the first and last names of all actors from the table actor.
select 
	first_name, 
    last_name 
from 
	actor
;


#1b) Display the first and last name of each actor in a single column in upper case letters. Name the column Actor Name.
select 
	concat(first_name, ' ',last_name) 
as 
	'Actor Name'
from 
	actor
;

#2a) You need to find the ID number, first name, and last name of an actor, of whom you know only the first name, "Joe." What is one query would you use to obtain this information?
select *
from 
	actor
where 
	first_name = 'Joe'
;

#2b. Find all actors whose last name contain the letters GEN:
select *
from 
	actor
where 
	last_name 
		like '%gen%'
;

#2c. Find all actors whose last names contain the letters LI. This time, order the rows by last name and first name, in that order:
select *
from 
	actor
where 
	last_name 
		like '%li%'
order by 
	last_name, 
    first_name
;

#2d. Using IN, display the country_id and country columns of the following countries: Afghanistan, Bangladesh, and China:
#select * from country;
select 
	country_id, 
	country
from 
	country
where 
	country
		in (
        'Afghanistan', 
        'Bangladesh', 
        'China'
	)
;

#3a. You want to keep a description of each actor. You don't think you will be performing queries on a description, so create a column in the table actor named description and use the data type BLOB (Make sure to research the type BLOB, as the difference between it and VARCHAR are significant).
alter table 
	actor 
add column 
	description blob
;

#3b. Very quickly you realize that entering descriptions for each actor is too much effort. Delete the description column.
alter table 
	actor
drop column 
	description
;

#4a. List the last names of actors, as well as how many actors have that last name. 
select 
	last_name,
count(*)
from 
	actor
group by 1
order by 2 desc
;

-- 4b. List last names of actors and the number of actors who have that last name, but only for names that are shared by at least two actors-- 
select 
	last_name,
count(*)
from
	actor
group by 1
having count(*) >= 2
;

-- The actor HARPO WILLIAMS was accidentally entered in the actor table as GROUCHO WILLIAMS. Write a query to fix the record.
update 
	actor
set 
	first_name = 
		'HARPO'
where 
	first_name = 
		'GROUCHO'
and last_name = 'WILLIAMS'
;

-- 4d. Perhaps we were too hasty in changing GROUCHO to HARPO. It turns out that GROUCHO was the correct name after all! In a single query, if the first name of the actor is currently HARPO, change it to GROUCHO.
UPDATE actor 
SET 
    first_name = 'GROUCHO'
WHERE
    first_name = 'HARPO'
        AND last_name = 'WILLIAMS'
;

-- 5a. You cannot locate the schema of the address table. Which query would you use to re-create it?
create table address (
	address_id int(5) primary key,
	address varchar(30),
	address2 varchar(30),
	district varchar(20),
	city_id int(5),
	postal_code int(5),
	phone int(10),
	location varchar(20),
	last_update int(6),
	primary key (address_id)
);

#6a. Use JOIN to display the first and last names, as well as the address, of each staff member. Use the tables staff and address:
select 
	staff.first_name, 
    staff.last_name, 
    address.address
from 
	staff 
join 
	address
on 
	staff.address_id = address.address_id
;

#6b. Use JOIN to display the total amount rung up by each staff member in August of 2005. Use tables staff and payment.
select 
	staff.first_name, 
	staff.last_name, 
    payment.amount
from
	staff
join 
	payment
on 
	staff.staff_id = payment.staff_id 
    between '2005-08-01' and '2005-08-31'
;

#6c. List each film and the number of actors who are listed for that film. Use tables film_actor and film. Use inner join.
select 
	film_actor.actor_id, 
    film.title
from 
	film_actor
inner join 
	film
on 
	film_actor.film_id = film.film_id
order by 
	film.title
;

#6d. How many copies of the film Hunchback Impossible exist in the inventory system?
select count(title)
from film 
inner join inventory 
on film.film_id = inventory.film_id
where title = 'Hunchback Impossible'
;

-- 6e. Using the tables payment and customer and the JOIN command, list the total paid by each customer. List the customers alphabetically by last name:-- 
select customer.first_name, customer.last_name, payment.amount
from customer
join payment
where customer.customer_id = payment.customer_id
order by last_name
;

#7a. The music of Queen and Kris Kristofferson have seen an unlikely resurgence. As an unintended consequence, films starting with the letters K and Q have also soared in popularity. Use subqueries to display the titles of movies starting with the letters K and Q whose language is English.
select title
where language_id = (select language_id from language where name = 'English')
and title like ('K%' or like 'Q%')
;

#7b. Use subqueries to display all actors who appear in the film Alone Trip.
select 
	first_name,
    last_name
from actor
where actor_id in(
	select actor_id
    from film_actor
    where film_id(
		select film_id 
		from film 
		where title = 'Alone Trip'
));

#7c. You want to run an email marketing campaign in Canada, for which you will need the names and email addresses of all Canadian customers. Use joins to retrieve this information.-- 
