# Install Python 3 and pip3
package { 'python3':
  ensure => latest,
}

package { 'python3-pip':
  ensure => installed,
}

# Install Flask and SQLAlchemy
package { ['flask', 'sqlalchemy']:
  ensure   => latest,
  provider => 'pip3',
  require  => Package['python3-pip'],
}

# Install PostgreSQL and its required packages
package { ['postgresql', 'postgresql-contrib', 'libpq-dev']:
  ensure => installed,
}

service { 'postgresql':
  ensure => running,
  enable => true,
  require => Package['postgresql'],
}


# Install psycopg2-binary
package { 'psycopg2-binary':
  ensure   => latest,
  provider => 'pip3',
}
