package com.ot.backend.ot_backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ot.backend.ot_backend.domain.Role;
import com.ot.backend.ot_backend.domain.User;

import java.util.Optional;



@Repository
public interface RoleRepository extends CrudRepository<Role, Long> {

    public Optional<User> findByName(String name);

}


