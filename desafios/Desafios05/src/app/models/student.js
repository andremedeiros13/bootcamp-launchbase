const {date, studadion } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback){
        db.query(`
        SELECT *
        FROM students
        ORDER BY name ASC`, function(err, results){
            if(err) throw `Database Error! Return all ${err}`

        callback(results.rows)
        })
    },
    create(data, callback){
        const query = `
        INSERT INTO students(
                avatar_url,
                name,
                email,
                birth_date,
                education_year,
                charge,
                teacher_id,
                created_at
                )
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
        `
        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth_date).iso,            
            studadion(data.education_year),            
            data.charge,
            data.teacher,
            date(Date.now()).iso
            
            
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database Error! Create! ${err}`
        
        callback(results.rows[0])      
        })
    },
    find(id, callback){
        db.query(`
            SELECT students.*, teachers.name AS teacher_name
            FROM students
            LEFT JOIN teachers ON (students.teacher_id = teachers.id)
            WHERE students.id = $1`, [id], function(err, results){
                if(err) throw `Database Error! Find! ${err}`

            callback(results.rows[0])
            })
    },
    update(data, callback){
        const query = `
            UPDATE students SET
                avatar_url=($1),
                name=($2),
                email=($3),
                birth_date=($4),
                education_year=($5),
                charge=($6),
                teacher_id=($7)
            WHERE id = $8`
        
        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth_date).iso,
            studadion(data.education_year),
            data.charge,
            data.teacher,
            data.id
        ]
        db.query(query,values, function(err, results){
            if(err) throw `Database Error! Update! ${err}`
            

            callback();
        })
    },
    delete(id, callback){
        db.query(`DELETE FROM students WHERE id = $1`, [id],function(err, results){
           if(err) throw `Database Error! Delete! ${err}`
            
            return callback()
        })
    },
    teacherSelectOptions(callback){
        db.query(`
            SELECT name, id FROM teachers
        `, function(err, results){
            if(err) throw `Database erro ${err}`

            return callback(results.rows)
        })
    },

    paginate(params) {
        const {filter, limit, offset, callback} = params

        let query = "",
            filterQuery = "",
            totalQuery = `(
                SELECT count(*) from students
            ) AS total`
        
        if(filter){
            filterQuery = `${query}
            WHERE students.name ILIKE '%${filter}%' 
            OR students.email ILIKE '%${filter}%'
            `
            totalQuery = `(
                SELECT count(*) FROM students
                ${filterQuery}
                ) as total`          
        }
        
        query = `
        SELECT students.*, ${totalQuery}
        FROM students
        ${filterQuery}        
        LIMIT $1 OFFSET $2
        `
        db.query(query,[limit, offset], function(err, results){
            if(err) throw 'Data Base error!'

            callback(results.rows)
        } )
    }
}